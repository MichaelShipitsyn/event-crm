import { combineReducers } from '@reduxjs/toolkit';
import { authSliceReducer } from 'store/auth/slice';

const rootReducer = combineReducers({
  auth: authSliceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
