import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SetRequestErrorPayload = {
  error: string;
};

type InitialState = {
  isLoading: boolean;
  requestError: string | null;
};

let initialState: InitialState = {
  isLoading: false,
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
    },
    startLoader(state) {
      state.isLoading = true;
    },
    stopLoader(state) {
      state.isLoading = false;
    }
  }
});

export const {
  setRequestError,
  resetRequestError,
  startLoader,
  stopLoader
} = globalSlice.actions;

export const globalSliceReducer = globalSlice.reducer;
