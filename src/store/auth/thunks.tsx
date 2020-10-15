import type { AppThunk } from 'store';
import { authApi } from 'api/auth';
import { LocalStorage } from 'utils/LocalStorage';
import { getErrorMessage } from 'utils/getErrorMessage';
import { setCurrentUser, removeCurrentUser, setAuthChecked } from './slice';
import {
  setRequestError,
  resetRequestError,
  startLoader,
  stopLoader
} from 'store/global/slice';

type LoginRequestPayload = {
  email: string;
  password: string;
};

export const loginRequest = (payload: LoginRequestPayload): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLoader());
    const response = await authApi.login(payload.email, payload.password);
    LocalStorage.setItem('token', response.data.access_token);
    authApi.setHeaderAuthorization(response.data.access_token);
    dispatch(setCurrentUser(response.data.user));
    dispatch(resetRequestError());
    dispatch(stopLoader());
  } catch (error) {
    const requestError = getErrorMessage(error);
    dispatch(stopLoader());
    dispatch(setRequestError({ error: requestError }));
  }
};

export const checkAuthRequest = (): AppThunk => async (dispatch) => {
  const token = LocalStorage.getItem('token');
  authApi.setHeaderAuthorization(token);
  try {
    const userData = await authApi.getUser();
    dispatch(setCurrentUser(userData.data));
  } catch (error) {
    dispatch(logoutUser());
  }
  dispatch(setAuthChecked());
};

export const logoutUser = (): AppThunk => async (dispatch) => {
  authApi.removeHeaderAuthorization();
  LocalStorage.removeItem('token');
  dispatch(removeCurrentUser());
};
