import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from 'store/auth/slice';
import { globalSliceReducer } from 'store/global/slice';
import { cacheSliceReducer } from 'store/cache/slice';

const rootReducer = combineReducers({
  auth: authSliceReducer,
  global: globalSliceReducer,
  cache: cacheSliceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
