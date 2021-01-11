import { request } from 'libs/request';
import { Client } from 'types/client';

type GetClientsParams = {
  page: number;
  limit: number;
};

export type GetClientsResult = {
  clients: Client[];
  total: number;
};

const getClients = async ({
  page,
  limit
}: GetClientsParams): Promise<GetClientsResult> => {
  const clientsResponse = await request.get<GetClientsResult>(
    `/clients?page=${page}&limit=${limit}`
  );
  return {
    clients: clientsResponse.data.clients,
    total: clientsResponse.data.total
  };
};

const updateClient = async (client: Client): Promise<void> => {
  await request.put(`/clients/${client.id}`, client);
};

const deleteClient = async (clientID: number): Promise<void> => {
  await request.delete(`/clients/${clientID}`);
};

export const clientApi = {
  getClients,
  updateClient,
  deleteClient
};
