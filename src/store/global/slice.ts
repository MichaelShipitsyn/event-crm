import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isServerError: boolean;
};

const initialState: InitialState = {
  isServerError: false
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setServerError(state, { payload }: PayloadAction<boolean>) {
      state.isServerError = payload;
    }
  }
});

export const { setServerError } = globalSlice.actions;

export const globalSliceReducer = globalSlice.reducer;
