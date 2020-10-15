import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/users';

type AuthState = {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
};

let initialState: AuthState = {
  isInitialised: false,
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialiseUser(state, action: PayloadAction<IUser>) {
      state.isInitialised = true;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeCurrentUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const authSliceReducer = authSlice.reducer;

export const { initialiseUser, removeCurrentUser } = authSlice.actions;
