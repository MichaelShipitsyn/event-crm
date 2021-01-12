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
  updateOrder,
  setOrderFormShow,
  createOrderRequestStart,
  createOrderRequestSuccess,
  createOrderRequestFail,
  createOrder
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
    dispatch(fetchOrdersRequestStart({ page, limit }));
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
    dispatch(updateOrderRequestSuccess());
    dispatch(updateOrder(order));
    dispatch(
      showAlert({
        alertMessage: 'Сотрудник успешно обновлён',
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
    dispatch(createOrderRequestSuccess());
    dispatch(createOrder(newOrder));
    dispatch(
      showAlert({
        alertMessage: 'Сотрудник успешно создан',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(createOrderRequestFail());
  } finally {
    dispatch(setOrderFormShow(false));
  }
};

export const deleteOrderThunk = (OrderID: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(deleteOrderStart());
    await orderApi.deleteOrder(OrderID);
    dispatch(deleteOrderSuccess());

    const page = getState().order.currentPage;
    const limit = getState().order.currentRowsPerPage;
    dispatch(fetchOrdersThunk({ page, limit }));
  } catch (err) {
    dispatch(deleteOrderFail());
  }
};
