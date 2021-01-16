import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from 'types/client';
import { GetClientsResult } from 'api/client';

type InitialState = {
  clients: Client[];
  totalClients: number;
  clientsFetchRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  deleteClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  createClientRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  editableClient: Client | null;
  isClientFormShow: boolean;
};

const initialState: InitialState = {
  clients: [],
  totalClients: 0,
  clientsFetchRequestStatus: 'idle',
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
    fetchClientsRequestStart(state) {
      state.clientsFetchRequestStatus = 'loading';
    },
    fetchClientsRequestSuccess(
      state,
      { payload }: PayloadAction<GetClientsResult>
    ) {
      state.clients = payload.clients;
      state.totalClients = payload.total;
      state.clientsFetchRequestStatus = 'success';
    },
    fetchClientsRequestFail(state) {
      state.clientsFetchRequestStatus = 'fail';
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
