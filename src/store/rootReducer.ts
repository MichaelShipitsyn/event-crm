import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from 'store/auth/slice';
import { cacheSliceReducer } from 'store/cache/slice';
import { clientSliceReducer } from 'store/client/slice';
import { employeeSliceReducer } from 'store/employee/slice';
import { globalSliceReducer } from 'store/global/slice';
import { orderSliceReducer } from 'store/order/slice';

export const rootReducer = combineReducers({
  auth: authSliceReducer,
  global: globalSliceReducer,
  cache: cacheSliceReducer,
  employee: employeeSliceReducer,
  client: clientSliceReducer,
  order: orderSliceReducer,
});
