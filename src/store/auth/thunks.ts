import { authApi } from 'api/auth';
import { history } from 'libs/history';
import type { AppThunk } from 'store';
import {
  removeCurrentUser,
  setAuthChecked,
  setAuthMessageError,
  setCurrentUser,
  setLoginRequestLoader,
  setRegisterRequestLoader,
} from 'store/auth/slice';
import { getErrorMessage } from 'utils/getErrorMessage';
import { LocalStorage } from 'utils/LocalStorage';

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

export const loginRequest =
  (payload: LoginRequestPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoginRequestLoader(true));
      const response = await authApi.login(payload.email, payload.password);
      LocalStorage.setItem('token', response.data.access_token);
      authApi.setHeaderAuthorization(response.data.access_token);
      dispatch(setCurrentUser(response.data.user));
      dispatch(setAuthMessageError(null));
      dispatch(setLoginRequestLoader(false));
      history.push('/app/employees');
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      dispatch(setLoginRequestLoader(false));
      dispatch(setAuthMessageError(errorMessage));
    }
  };

export const registerRequest =
  (payload: RegisterRequestPayload): AppThunk =>
  async (dispatch) => {
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
      dispatch(setAuthMessageError(null));
      dispatch(setRegisterRequestLoader(false));
      history.push('/app/employees');
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      dispatch(setRegisterRequestLoader(false));
      dispatch(setAuthMessageError(errorMessage));
    }
  };

export const checkAuthRequest = (): AppThunk => async (dispatch) => {
  const token = LocalStorage.getItem('token');
  authApi.setHeaderAuthorization(token);
  try {
    const userData = await authApi.getUser();
    dispatch(setCurrentUser(userData.data));
  } catch {
    dispatch(logoutUser());
  }
  dispatch(setAuthChecked());
};

export const logoutUser = (): AppThunk => (dispatch) => {
  authApi.removeHeaderAuthorization();
  LocalStorage.removeItem('token');
  dispatch(removeCurrentUser());
};
