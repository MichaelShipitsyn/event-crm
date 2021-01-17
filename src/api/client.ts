import { request } from 'libs/request';
import { Client, NewClient } from 'types/client';

type GetClientsParams = {
  limit: number;
  page?: number;
  query: string | null;
};

export type GetClientsResult = {
  clients: Client[];
  total: number;
};

const getClients = async ({
  page,
  limit,
  query
}: GetClientsParams): Promise<GetClientsResult> => {
  let url = `/clients?limit=${limit}&`;

  if (page) url += `page=${page}&`;
  if (query) url += `query=${query}&`;

  const clientsResponse = await request.get<GetClientsResult>(url);
  return {
    clients: clientsResponse.data.clients,
    total: clientsResponse.data.total
  };
};

const createClient = async (client: NewClient): Promise<Client> => {
  const createClientResponse = await request.post<Client>('/clients', client);
  return createClientResponse.data;
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
  deleteClient,
  createClient
};
