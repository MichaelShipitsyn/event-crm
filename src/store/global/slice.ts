import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SetRequestErrorPayload = {
  error: string;
};

type InitialState = {
  requestError: string | null;
  isServerError: boolean;
};

const initialState: InitialState = {
  requestError: null,
  isServerError: false
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
    },
    setServerError(state, { payload }: PayloadAction<boolean>) {
      state.isServerError = payload;
    }
  }
});

export const {
  setRequestError,
  resetRequestError,
  setServerError
} = globalSlice.actions;

export const globalSliceReducer = globalSlice.reducer;
