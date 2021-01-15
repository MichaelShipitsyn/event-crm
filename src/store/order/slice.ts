import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, NewOrder } from 'types/order';
import { GetOrdersResult } from 'api/order';

type InitialState = {
  orders: Order[];
  totalOrdersPages: number;
  isOrdersFetchLoading: boolean;
  deleteOrderRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateOrderRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  createOrderRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  editableOrder: Order | null;
  isOrderFormShow: boolean;
};

type FetchOrdersStartPayload = {
  page: number;
  limit: number;
};

const initialState: InitialState = {
  orders: [],
  totalOrdersPages: 0,
  isOrdersFetchLoading: false,
  deleteOrderRequestStatus: 'idle',
  updateOrderRequestStatus: 'idle',
  createOrderRequestStatus: 'idle',
  editableOrder: null,
  isOrderFormShow: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersRequestStart(
      state,
      { payload }: PayloadAction<FetchOrdersStartPayload>
    ) {
      state.isOrdersFetchLoading = true;
    },
    fetchOrdersRequestSuccess(
      state,
      { payload }: PayloadAction<GetOrdersResult>
    ) {
      state.orders = payload.orders;
      state.totalOrdersPages = payload.total;
      state.isOrdersFetchLoading = false;
    },
    fetchOrdersRequestFail(state) {
      state.isOrdersFetchLoading = false;
    },
    deleteOrderStart(state) {
      state.deleteOrderRequestStatus = 'loading';
    },
    deleteOrderSuccess(state, { payload }: PayloadAction<number>) {
      state.deleteOrderRequestStatus = 'success';
      const index = state.orders.findIndex((order) => order.id === payload);
      state.orders.splice(index, 1);
    },
    deleteOrderFail(state) {
      state.deleteOrderRequestStatus = 'fail';
    },
    updateOrderRequestStart(state) {
      state.updateOrderRequestStatus = 'loading';
    },
    updateOrderRequestSuccess(state, { payload }: PayloadAction<Order>) {
      state.updateOrderRequestStatus = 'success';
      const index = state.orders.findIndex((order) => order.id === payload.id);
      state.orders[index] = payload;
    },
    updateOrderRequestFail(state) {
      state.updateOrderRequestStatus = 'fail';
    },
    setEditableOrder(state, { payload }: PayloadAction<Order | null>) {
      if (payload) {
        state.isOrderFormShow = true;
      }
      state.editableOrder = payload;
    },
    setOrderFormShow(state, { payload }: PayloadAction<boolean>) {
      if (!payload) {
        state.editableOrder = null;
      }
      state.isOrderFormShow = payload;
    },
    createOrderRequestStart(state) {
      state.createOrderRequestStatus = 'loading';
    },
    createOrderRequestSuccess(state, { payload }: PayloadAction<Order>) {
      state.createOrderRequestStatus = 'success';
      state.orders.unshift(payload);
    },
    createOrderRequestFail(state) {
      state.createOrderRequestStatus = 'fail';
    }
  }
});

export const orderSliceReducer = orderSlice.reducer;

export const {
  fetchOrdersRequestStart,
  fetchOrdersRequestSuccess,
  fetchOrdersRequestFail,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequestStart,
  updateOrderRequestSuccess,
  updateOrderRequestFail,
  setEditableOrder,
  setOrderFormShow,
  createOrderRequestStart,
  createOrderRequestSuccess,
  createOrderRequestFail
} = orderSlice.actions;
