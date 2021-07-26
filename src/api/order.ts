import { request } from 'libs/request';
import { NewOrder, Order } from 'types/order';

type GetOrdersParams = {
  limit: number;
  page?: number;
  query: string | null;
};

export type GetOrdersResult = {
  orders: Order[];
  total: number;
};

const getOrders = async ({
  limit,
  page,
  query,
}: GetOrdersParams): Promise<GetOrdersResult> => {
  let url = `/orders?limit=${limit}&`;
  if (page) url += `page=${page}&`;
  if (query) url += `query=${query}&`;

  const ordersResponse = await request.get<GetOrdersResult>(url);
  return {
    orders: ordersResponse.data.orders,
    total: ordersResponse.data.total,
  };
};

const createOrder = async (order: NewOrder): Promise<Order> => {
  const createOrderResponse = await request.post<Order>('/orders', order);
  return createOrderResponse.data;
};

const updateOrder = async (order: Order): Promise<void> => {
  await request.put(`/orders/${order.id}`, order);
};

const deleteOrder = async (orderID: number): Promise<void> => {
  await request.delete(`/orders/${orderID}`);
};

export const orderApi = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
