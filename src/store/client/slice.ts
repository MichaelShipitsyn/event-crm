import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from 'types/client';
import { GetClientsResult } from 'api/client';

type InitialState = {
  clients: Client[];
  totalClientsPages: number;
  isClientsFetchLoading: boolean;
  deleteClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  currentPage: number;
  currentRowsPerPage: number;
  editableClient: Client | null;
  isClientFormShow: boolean;
};

type FetchClientsStartPayload = {
  page: number;
  limit: number;
};

const initialState: InitialState = {
  clients: [],
  totalClientsPages: 0,
  isClientsFetchLoading: false,
  deleteClientRequestStatus: 'idle',
  updateClientRequestStatus: 'idle',
  currentPage: 1,
  currentRowsPerPage: 15,
  editableClient: null,
  isClientFormShow: false
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    fetchClientsRequestStart(
      state,
      { payload }: PayloadAction<FetchClientsStartPayload>
    ) {
      state.isClientsFetchLoading = true;
      state.currentPage = payload.page;
      state.currentRowsPerPage = payload.limit;
    },
    fetchClientsRequestSuccess(
      state,
      { payload }: PayloadAction<GetClientsResult>
    ) {
      state.clients = payload.clients;
      state.totalClientsPages = payload.total;
      state.isClientsFetchLoading = false;
    },
    fetchClientsRequestFail(state) {
      state.isClientsFetchLoading = false;
    },
    deleteClientStart(state) {
      state.deleteClientRequestStatus = 'loading';
    },
    deleteClientSuccess(state) {
      state.deleteClientRequestStatus = 'success';
    },
    deleteClientFail(state) {
      state.deleteClientRequestStatus = 'fail';
    },
    updateClientRequestStart(state) {
      state.updateClientRequestStatus = 'loading';
    },
    updateClientRequestSuccess(state) {
      state.updateClientRequestStatus = 'success';
    },
    updateClientRequestFail(state) {
      state.updateClientRequestStatus = 'fail';
    },
    updateClient(state, { payload }: PayloadAction<Client>) {
      const index = state.clients.findIndex(
        (client) => client.id === payload.id
      );
      state.clients.splice(index, 1, payload);
    },
    setEditableClient(state, { payload }: PayloadAction<Client | null>) {
      if (payload) {
        state.isClientFormShow = true;
      }
      state.editableClient = payload;
    },
    setClientFormShow(state, { payload }: PayloadAction<boolean>) {
      if (!payload) {
        state.editableClient = null;
      }
      state.isClientFormShow = payload;
    }
  }
});

export const clientSliceReducer = clientSlice.reducer;

export const {
  fetchClientsRequestStart,
  fetchClientsRequestSuccess,
  fetchClientsRequestFail,
  deleteClientStart,
  deleteClientSuccess,
  deleteClientFail,
  updateClientRequestStart,
  updateClientRequestSuccess,
  updateClientRequestFail,
  updateClient,
  setEditableClient,
  setClientFormShow
} = clientSlice.actions;
