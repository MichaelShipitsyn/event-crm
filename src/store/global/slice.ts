import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  alertMessage: string | null;
  alertType: 'success' | 'info' | 'warning' | 'error';
};

type ShowAlertPayload = {
  alertMessage: string | null;
  alertType: 'success' | 'info' | 'warning' | 'error';
};

const initialState: InitialState = {
  alertMessage: null,
  alertType: 'error'
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showAlert(state, { payload }: PayloadAction<ShowAlertPayload>) {
      state.alertMessage = payload.alertMessage;
      state.alertType = payload.alertType;
    },
    closeAlert(state) {
      state.alertMessage = null;
    }
  }
});

export const { showAlert, closeAlert } = globalSlice.actions;

export const globalSliceReducer = globalSlice.reducer;
