import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/users';

type AuthPayload = {
  user: IUser;
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
    setCurrentUser(state, action: PayloadAction<AuthPayload>) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { setCurrentUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
