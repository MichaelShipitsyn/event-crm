import type { AppThunk } from 'store';
import { authApi } from 'api/auth';
import { history } from 'libs/history';
import { LocalStorage } from 'utils/LocalStorage';
import { getErrorMessage } from 'utils/getErrorMessage';
import { setCurrentUser, removeCurrentUser, setAuthChecked } from './slice';
import { setRequestError, resetRequestError } from 'store/global/slice';
import {
  setLoginRequestLoader,
  setRegisterRequestLoader
} from 'store/auth/slice';

type LoginRequestPayload = {
  email: string;
  password: string;
};

type RegisterRequestPayload = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export const loginRequest = (payload: LoginRequestPayload): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(setLoginRequestLoader(true));
    const response = await authApi.login(payload.email, payload.password);
    LocalStorage.setItem('token', response.data.access_token);
    authApi.setHeaderAuthorization(response.data.access_token);
    dispatch(setCurrentUser(response.data.user));
    dispatch(resetRequestError());
    dispatch(setLoginRequestLoader(false));
    history.push('/app/employees');
  } catch (error) {
    const requestError = getErrorMessage(error);
    dispatch(setLoginRequestLoader(false));
    dispatch(setRequestError({ error: requestError }));
  }
};

export const registerRequest = (
  payload: RegisterRequestPayload
): AppThunk => async (dispatch) => {
  try {
    dispatch(setRegisterRequestLoader(true));
    const response = await authApi.register(
      payload.firstname,
      payload.lastname,
      payload.email,
      payload.password
    );
    LocalStorage.setItem('token', response.data.access_token);
    authApi.setHeaderAuthorization(response.data.access_token);
    dispatch(setCurrentUser(response.data.user));
    dispatch(resetRequestError());
    dispatch(setRegisterRequestLoader(false));
    history.push('/app/employees');
  } catch (error) {
    const requestError = getErrorMessage(error);
    dispatch(setRegisterRequestLoader(false));
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