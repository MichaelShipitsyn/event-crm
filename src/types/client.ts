export interface NewClient {
  name: string;
  phone: string | null;
  email: string | null;
  additional: string | null;
}

export interface Client extends NewClient {
  id: number;
}

export const isNewClient = (client: any): client is NewClient => {
  return client.id === undefined;
};
