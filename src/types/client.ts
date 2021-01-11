export interface NewClient {
  name: string;
  phone: string | null;
  email: string | null;
  additional: string | null;
}

export interface Client extends NewClient {
  id: number;
}
