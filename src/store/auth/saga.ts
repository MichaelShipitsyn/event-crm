import { takeLatest, put } from 'redux-saga/effects';
import { loginRequestSaga } from 'store/auth/slice';
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
    yield LocalStorage.setItem('user', userData.data);

    yield put(resetRequestError());
    yield put(stopLoader());
  } catch (error) {
    yield put(stopLoader());
    yield put(setRequestError({ error }));
  }
}

export function* watchAuthActions() {
  yield takeLatest(loginRequestSaga, loginRequest);
}
