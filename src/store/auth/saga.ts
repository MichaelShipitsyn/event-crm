import { takeLatest, put } from 'redux-saga/effects';
import {
  loginRequestSaga,
  checkAuthRequestSaga,
  setCurrentUser,
  logoutRequestSaga,
  removeCurrentUser
} from 'store/auth/slice';
import { authApi } from 'api/auth';
import { LocalStorage } from 'utils/LocalStorage';
import {
  setRequestError,
  resetRequestError,
  startLoader,
  stopLoader
} from 'store/global/slice';

function* loginRequest({ payload }: ReturnType<typeof loginRequestSaga>) {
  try {
    yield put(startLoader());

    const response = yield authApi.login(payload.email, payload.password);
    yield LocalStorage.setItem('token', response.data.access_token);
    yield authApi.setHeaderAuthorization(response.data.access_token);
    const userData = yield authApi.getUser();
    yield put(setCurrentUser(userData.data));
    yield LocalStorage.setItem('user', userData.data);

    yield put(resetRequestError());
    yield put(stopLoader());
  } catch (error) {
    const requestError = error.response.data.message;
    yield put(stopLoader());
    yield put(setRequestError({ error: requestError }));
  }
}

function* checkAuthRequest() {
  const token = LocalStorage.getItem('token');
  yield authApi.setHeaderAuthorization(token);
  const userData = yield authApi.getUser();
  yield put(setCurrentUser(userData.data));
  yield LocalStorage.setItem('user', userData.data);
}

function* logoutRequest() {
  authApi.removeHeaderAuthorization();
  LocalStorage.removeItem('token');
  LocalStorage.removeItem('user');
  yield put(removeCurrentUser());
}

export function* watchAuthActions() {
  yield takeLatest(loginRequestSaga, loginRequest);
  yield takeLatest(checkAuthRequestSaga, checkAuthRequest);
  yield takeLatest(logoutRequestSaga, logoutRequest);
}
