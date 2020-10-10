import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/users';
import type { AppThunk } from 'store';
import { authApi } from 'api/auth';
import { LocalStorage } from 'utils/LocalStorage';
import { getErrorMessage } from 'utils/getErrorMessage';
import {
  setRequestError,
  resetRequestError,
  startLoader,
  stopLoader
} from 'store/global/slice';

type SetCurrentUserPayload = {
  user: IUser;
};

type LoginRequestPayload = {
  email: string;
  password: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: IUser | null;
};

let initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<SetCurrentUserPayload>) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
    removeCurrentUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const authSliceReducer = authSlice.reducer;

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;

export const loginRequest = (payload: LoginRequestPayload): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLoader());
    const response = await authApi.login(payload.email, payload.password);
    LocalStorage.setItem('token', response.data.access_token);
    await authApi.setHeaderAuthorization(response.data.access_token);
    const userData = await authApi.getUser();
    dispatch(setCurrentUser(userData.data));
    LocalStorage.setItem('user', userData.data);
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
  await authApi.setHeaderAuthorization(token);
  try {
    const userData = await authApi.getUser();
    dispatch(setCurrentUser(userData.data));
    LocalStorage.setItem('user', userData.data);
  } catch (error) {
    dispatch(logoutRequest());
    window.location.href = '/';
  }
};

export const logoutRequest = (): AppThunk => async (dispatch) => {
  authApi.removeHeaderAuthorization();
  LocalStorage.removeItem('token');
  LocalStorage.removeItem('user');
  dispatch(removeCurrentUser());
};
