import { configureStore, Action } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { ThunkAction } from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
