import { clientApi } from 'api/client';
import type { AppThunk } from 'store';
import { Client, NewClient } from 'types/client';
import { showAlert } from 'store/global/slice';
import {
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
  setClientFormShow,
  createClientRequestStart,
  createClientRequestSuccess,
  createClientRequestFail,
  createClient
} from './slice';

type FetchClientsParams = {
  page: number;
  limit: number;
};

export const fetchClientsThunk = ({
  page,
  limit
}: FetchClientsParams): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchClientsRequestStart({ page, limit }));
    const clients = await clientApi.getClients({ page, limit });
    dispatch(fetchClientsRequestSuccess(clients));
  } catch (err) {
    dispatch(fetchClientsRequestFail());
  }
};

export const updateClientThunk = (client: Client): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateClientRequestStart());
    await clientApi.updateClient(client);
    dispatch(updateClientRequestSuccess());
    dispatch(updateClient(client));
    dispatch(
      showAlert({
        alertMessage: 'Сотрудник успешно обновлён',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(updateClientRequestFail());
  } finally {
    dispatch(setClientFormShow(false));
  }
};

export const createClientThunk = (client: NewClient): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(createClientRequestStart());
    const newClient = await clientApi.createClient(client);
    dispatch(createClientRequestSuccess());
    dispatch(createClient(newClient));
    dispatch(
      showAlert({
        alertMessage: 'Сотрудник успешно создан',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(createClientRequestFail());
  } finally {
    dispatch(setClientFormShow(false));
  }
};

export const deleteClientThunk = (clientID: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(deleteClientStart());
    await clientApi.deleteClient(clientID);
    dispatch(deleteClientSuccess());

    const page = getState().client.currentPage;
    const limit = getState().client.currentRowsPerPage;
    dispatch(fetchClientsThunk({ page, limit }));
  } catch (err) {
    dispatch(deleteClientFail());
  }
};
