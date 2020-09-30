import { all } from 'redux-saga/effects';
import { watchAuthActions } from 'store/auth/saga';

export default function* root() {
  yield all([watchAuthActions()]);
}
