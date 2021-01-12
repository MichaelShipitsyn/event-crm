import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from 'store/auth/slice';
import { globalSliceReducer } from 'store/global/slice';
import { cacheSliceReducer } from 'store/cache/slice';
import { employeeSliceReducer } from 'store/employee/slice';
import { clientSliceReducer } from 'store/client/slice';
import { orderSliceReducer } from 'store/order/slice';

const rootReducer = combineReducers({
  auth: authSliceReducer,
  global: globalSliceReducer,
  cache: cacheSliceReducer,
  employee: employeeSliceReducer,
  client: clientSliceReducer,
  order: orderSliceReducer
});

export default rootReducer;
