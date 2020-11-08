import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';

type AuthState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: User | null;
  isLoginRequestLoading: boolean;
  isRegisterRequestLoading: boolean;
};

const initialState: AuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  isLoginRequestLoading: false,
  isRegisterRequestLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeCurrentUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAuthChecked(state) {
      state.isAuthChecked = true;
    },
    setLoginRequestLoader(state, action) {
      state.isLoginRequestLoading = action.payload;
    },
    setRegisterRequestLoader(state, action) {
      state.isRegisterRequestLoading = action.payload;
    }
  }
});

export const authSliceReducer = authSlice.reducer;

export const {
  setCurrentUser,
  removeCurrentUser,
  setAuthChecked,
  setLoginRequestLoader,
  setRegisterRequestLoader
} = authSlice.actions;
