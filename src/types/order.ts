import { Client } from './client';

export type OrderStage = {
  id: number;
  name: string;
  key: string;
};

export type NewOrder = {
  name: string;
  address: string | null;
  cost: number;
  prepay: number | null;
  description: string | null;
};

export type Order = NewOrder & {
  id: number;
  client: Client;
  stage: OrderStage;
};

export const isNewOrder = (order: any): order is NewOrder => {
  return order.id === undefined;
};
