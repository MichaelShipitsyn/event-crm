import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/users';

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
    loginRequestSaga(state, action: PayloadAction<LoginRequestPayload>) {},
    logoutRequestSaga() {},
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

export const {
  setCurrentUser,
  removeCurrentUser,
  loginRequestSaga,
  logoutRequestSaga
} = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
