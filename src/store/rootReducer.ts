import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from 'store/auth/slice';
import { globalSliceReducer } from 'store/global/slice';
const rootReducer = combineReducers({
  auth: authSliceReducer,
  global: globalSliceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
