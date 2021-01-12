import { NewClient } from './client';

export interface OrderStage {
  id: number;
  name: string;
  key: string;
}

export interface NewOrder {
  name: string;
  address: string | null;
  cost: number;
  prepay: number | null;
  description: string | null;
  client_id: number;
  stage_id: number;
}

export const isNewOrder = (order: any): order is NewOrder => {
  return order.id === undefined;
};

export interface Order extends NewOrder {
  id: number;
}
