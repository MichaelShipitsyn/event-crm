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
  currentPage: number;
  currentRowsPerPage: number;
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
  currentPage: 1,
  currentRowsPerPage: 15,
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
      state.currentPage = payload.page;
      state.currentRowsPerPage = payload.limit;
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
    deleteOrderSuccess(state) {
      state.deleteOrderRequestStatus = 'success';
    },
    deleteOrderFail(state) {
      state.deleteOrderRequestStatus = 'fail';
    },
    updateOrderRequestStart(state) {
      state.updateOrderRequestStatus = 'loading';
    },
    updateOrderRequestSuccess(state) {
      state.updateOrderRequestStatus = 'success';
    },
    updateOrderRequestFail(state) {
      state.updateOrderRequestStatus = 'fail';
    },
    updateOrder(state, { payload }: PayloadAction<Order>) {
      const index = state.orders.findIndex((order) => order.id === payload.id);
      state.orders[index] = payload;
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
    createOrderRequestSuccess(state) {
      state.createOrderRequestStatus = 'success';
    },
    createOrderRequestFail(state) {
      state.createOrderRequestStatus = 'fail';
    },
    createOrder(state, { payload }: PayloadAction<Order>) {
      state.orders.unshift(payload);
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
  updateOrder,
  setEditableOrder,
  setOrderFormShow,
  createOrderRequestStart,
  createOrderRequestSuccess,
  createOrderRequestFail,
  createOrder
} = orderSlice.actions;
