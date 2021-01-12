import { request } from 'libs/request';
import { Order, NewOrder } from 'types/order';

type GetOrdersParams = {
  page: number;
  limit: number;
};

export type GetOrdersResult = {
  orders: Order[];
  total: number;
};

const getOrders = async ({
  page,
  limit
}: GetOrdersParams): Promise<GetOrdersResult> => {
  const ordersResponse = await request.get<GetOrdersResult>(
    `/orders?page=${page}&limit=${limit}`
  );
  return {
    orders: ordersResponse.data.orders,
    total: ordersResponse.data.total
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
  deleteOrder
};
