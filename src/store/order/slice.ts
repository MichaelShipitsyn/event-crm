import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetOrdersResult } from 'api/order';
import { Order } from 'types/order';

type InitialState = {
  orders: Order[];
  totalOrders: number;
  searchQuery: string | null;
  ordersFetchRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  deleteOrderRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateOrderRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  createOrderRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  editableOrder: Order | null;
  isOrderFormShow: boolean;
};

const initialState: InitialState = {
  orders: [],
  totalOrders: 0,
  searchQuery: null,
  ordersFetchRequestStatus: 'idle',
  deleteOrderRequestStatus: 'idle',
  updateOrderRequestStatus: 'idle',
  createOrderRequestStatus: 'idle',
  editableOrder: null,
  isOrderFormShow: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersRequestStart(state) {
      state.ordersFetchRequestStatus = 'loading';
    },
    fetchOrdersRequestSuccess(
      state,
      { payload }: PayloadAction<GetOrdersResult>
    ) {
      state.orders = payload.orders;
      state.totalOrders = payload.total;
      state.ordersFetchRequestStatus = 'success';
    },
    fetchOrdersRequestFail(state) {
      state.ordersFetchRequestStatus = 'fail';
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
    },
    setSearchQuery(state, { payload }: PayloadAction<string>) {
      state.searchQuery = payload;
    },
  },
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
  createOrderRequestFail,
  setSearchQuery,
} = orderSlice.actions;
