import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  cache: string[];
};

const initialState: InitialState = {
  cache: ['123']
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCached(state, action: PayloadAction<string>) {
      const url = action.payload;
      state.cache.push(url);
    }
  }
});

export const { setCached } = cacheSlice.actions;

export const cacheSliceReducer = cacheSlice.reducer;
