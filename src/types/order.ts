export interface OrderStage {
  id: number;
  name: string;
  key: string;
}

export interface NewOrder {
  id: number;
  name: string;
  address: string | null;
  cost: number;
  prepay: number | null;
  description: string | null;
  client_id: number;
  stage_id: number;
}

export interface Order extends NewOrder {
  id: number;
}
