import { clientApi } from 'api/client';
import type { AppThunk } from 'store';
import { showAlert } from 'store/global/slice';
import { Client, NewClient } from 'types/client';

import {
  createClientRequestFail,
  createClientRequestStart,
  createClientRequestSuccess,
  deleteClientFail,
  deleteClientStart,
  deleteClientSuccess,
  fetchClientsRequestFail,
  fetchClientsRequestStart,
  fetchClientsRequestSuccess,
  setClientFormShow,
  updateClientRequestFail,
  updateClientRequestStart,
  updateClientRequestSuccess,
} from './slice';

type FetchClientsParams = {
  limit: number;
  page?: number;
};

export const fetchClientsThunk =
  ({ page = 1, limit }: FetchClientsParams): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchClientsRequestStart());
      const clients = await clientApi.getClients({
        page,
        limit,
        query: getState().client.searchQuery,
      });
      dispatch(fetchClientsRequestSuccess(clients));
    } catch {
      dispatch(fetchClientsRequestFail());
    }
  };

export const updateClientThunk =
  (client: Client): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updateClientRequestStart());
      await clientApi.updateClient(client);
      dispatch(updateClientRequestSuccess(client));
      dispatch(
        showAlert({
          alertMessage: 'Сотрудник успешно обновлён',
          alertType: 'success',
        })
      );
    } catch {
      dispatch(updateClientRequestFail());
    } finally {
      dispatch(setClientFormShow(false));
    }
  };

export const createClientThunk =
  (client: NewClient): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(createClientRequestStart());
      const newClient = await clientApi.createClient(client);
      dispatch(createClientRequestSuccess(newClient));
      dispatch(
        showAlert({
          alertMessage: 'Сотрудник успешно создан',
          alertType: 'success',
        })
      );
    } catch {
      dispatch(createClientRequestFail());
    } finally {
      dispatch(setClientFormShow(false));
    }
  };

export const deleteClientThunk =
  (clientId: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteClientStart());
      await clientApi.deleteClient(clientId);
      dispatch(deleteClientSuccess(clientId));
      dispatch(
        showAlert({
          alertMessage: 'Сотрудник успешно удалён',
          alertType: 'success',
        })
      );
    } catch {
      dispatch(deleteClientFail());
    }
  };
