import { orderApi } from 'api/order';
import type { AppThunk } from 'store';
import { showAlert } from 'store/global/slice';
import { NewOrder, Order } from 'types/order';

import {
  createOrderRequestFail,
  createOrderRequestStart,
  createOrderRequestSuccess,
  deleteOrderFail,
  deleteOrderStart,
  deleteOrderSuccess,
  fetchOrdersRequestFail,
  fetchOrdersRequestStart,
  fetchOrdersRequestSuccess,
  setOrderFormShow,
  updateOrderRequestFail,
  updateOrderRequestStart,
  updateOrderRequestSuccess,
} from './slice';

type FetchOrdersParams = {
  limit: number;
  page?: number;
};

export const fetchOrdersThunk =
  ({ page = 1, limit }: FetchOrdersParams): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(fetchOrdersRequestStart());
      const orders = await orderApi.getOrders({
        page,
        limit,
        query: getState().order.searchQuery,
      });
      dispatch(fetchOrdersRequestSuccess(orders));
    } catch {
      dispatch(fetchOrdersRequestFail());
    }
  };

export const updateOrderThunk =
  (order: Order): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updateOrderRequestStart());
      await orderApi.updateOrder(order);
      dispatch(updateOrderRequestSuccess(order));
      dispatch(
        showAlert({
          alertMessage: 'Заказ успешно обновлён',
          alertType: 'success',
        })
      );
    } catch {
      dispatch(updateOrderRequestFail());
    } finally {
      dispatch(setOrderFormShow(false));
    }
  };

export const createOrderThunk =
  (order: NewOrder): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(createOrderRequestStart());
      const newOrder = await orderApi.createOrder(order);
      dispatch(createOrderRequestSuccess(newOrder));
      dispatch(
        showAlert({
          alertMessage: 'Заказ успешно создан',
          alertType: 'success',
        })
      );
    } catch {
      dispatch(createOrderRequestFail());
    } finally {
      dispatch(setOrderFormShow(false));
    }
  };

export const deleteOrderThunk =
  (orderId: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteOrderStart());
      await orderApi.deleteOrder(orderId);
      dispatch(deleteOrderSuccess(orderId));
      dispatch(
        showAlert({
          alertMessage: 'Заказ успешно удалён',
          alertType: 'success',
        })
      );
    } catch {
      dispatch(deleteOrderFail());
    }
  };
