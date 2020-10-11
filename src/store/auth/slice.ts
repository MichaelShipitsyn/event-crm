import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'types/users';

type SetCurrentUserPayload = {
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
