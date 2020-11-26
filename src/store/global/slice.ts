import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SetRequestErrorPayload = {
  error: string;
};

type InitialState = {
  requestError: string | null;
};

const initialState: InitialState = {
  requestError: null
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setRequestError(state, action: PayloadAction<SetRequestErrorPayload>) {
      const { error } = action.payload;
      state.requestError = error;
    },
    resetRequestError(state) {
      state.requestError = null;
    }
  }
});

export const {
  setRequestError,
  resetRequestError
} = globalSlice.actions;

export const globalSliceReducer = globalSlice.reducer;
