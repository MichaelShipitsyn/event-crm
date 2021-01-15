import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from 'types/client';
import { GetClientsResult } from 'api/client';

type InitialState = {
  clients: Client[];
  totalClientsPages: number;
  isClientsFetchLoading: boolean;
  deleteClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  createClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
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
  createClientRequestStatus: 'idle',
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
    deleteClientSuccess(state, { payload }: PayloadAction<number>) {
      state.deleteClientRequestStatus = 'success';
      const index = state.clients.findIndex((client) => client.id === payload);
      state.clients.splice(index, 1);
    },
    deleteClientFail(state) {
      state.deleteClientRequestStatus = 'fail';
    },
    updateClientRequestStart(state) {
      state.updateClientRequestStatus = 'loading';
    },
    updateClientRequestSuccess(state, { payload }: PayloadAction<Client>) {
      state.updateClientRequestStatus = 'success';
      const index = state.clients.findIndex(
        (client) => client.id === payload.id
      );
      state.clients[index] = payload;
    },
    updateClientRequestFail(state) {
      state.updateClientRequestStatus = 'fail';
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
    },
    createClientRequestStart(state) {
      state.createClientRequestStatus = 'loading';
    },
    createClientRequestSuccess(state, { payload }: PayloadAction<Client>) {
      state.createClientRequestStatus = 'success';
      state.clients.unshift(payload);
    },
    createClientRequestFail(state) {
      state.createClientRequestStatus = 'fail';
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
  setEditableClient,
  setClientFormShow,
  createClientRequestStart,
  createClientRequestSuccess,
  createClientRequestFail
} = clientSlice.actions;
