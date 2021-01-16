import { orderApi } from 'api/order';
import type { AppThunk } from 'store';
import { Order, NewOrder } from 'types/order';
import { showAlert } from 'store/global/slice';
import {
  fetchOrdersRequestStart,
  fetchOrdersRequestSuccess,
  fetchOrdersRequestFail,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequestStart,
  updateOrderRequestSuccess,
  updateOrderRequestFail,
  setOrderFormShow,
  createOrderRequestStart,
  createOrderRequestSuccess,
  createOrderRequestFail
} from './slice';

type FetchOrdersParams = {
  page: number;
  limit: number;
};

export const fetchOrdersThunk = ({
  page,
  limit
}: FetchOrdersParams): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchOrdersRequestStart());
    const orders = await orderApi.getOrders({ page, limit });
    dispatch(fetchOrdersRequestSuccess(orders));
  } catch (err) {
    dispatch(fetchOrdersRequestFail());
  }
};

export const updateOrderThunk = (order: Order): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateOrderRequestStart());
    await orderApi.updateOrder(order);
    dispatch(updateOrderRequestSuccess(order));
    dispatch(
      showAlert({
        alertMessage: 'Заказ успешно обновлён',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(updateOrderRequestFail());
  } finally {
    dispatch(setOrderFormShow(false));
  }
};

export const createOrderThunk = (order: NewOrder): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(createOrderRequestStart());
    const newOrder = await orderApi.createOrder(order);
    dispatch(createOrderRequestSuccess(newOrder));
    dispatch(
      showAlert({
        alertMessage: 'Заказ успешно создан',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(createOrderRequestFail());
  } finally {
    dispatch(setOrderFormShow(false));
  }
};

export const deleteOrderThunk = (orderId: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(deleteOrderStart());
    await orderApi.deleteOrder(orderId);
    dispatch(deleteOrderSuccess(orderId));
    dispatch(
      showAlert({
        alertMessage: 'Заказ успешно удалён',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(deleteOrderFail());
  }
};
