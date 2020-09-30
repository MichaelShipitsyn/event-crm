import { takeLatest } from 'redux-saga/effects';
import { loginRequest } from './slice';

function* handleLoginRequest() {
  console.log('loginUserRequest');
}

export function* watchAuthActions() {
  yield takeLatest(loginRequest, handleLoginRequest);
}
