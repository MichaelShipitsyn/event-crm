import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/users';

type AuthState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
};

let initialState: AuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeCurrentUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setAuthChecked(state) {
      state.isAuthChecked = true;
    }
  }
});

export const authSliceReducer = authSlice.reducer;

export const {
  setCurrentUser,
  removeCurrentUser,
  setAuthChecked
} = authSlice.actions;
