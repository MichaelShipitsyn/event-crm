import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from 'store/auth/slice';
import { globalSliceReducer } from 'store/global/slice';
import { cacheSliceReducer } from 'store/cache/slice';
import { employeeSliceReducer } from 'store/employee/slice';

const rootReducer = combineReducers({
  auth: authSliceReducer,
  global: globalSliceReducer,
  cache: cacheSliceReducer,
  employee: employeeSliceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
