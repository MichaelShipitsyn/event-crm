import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';
import { fetchEmployees } from './thunks';

type InitialState = {
  employees: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: unknown;
};

const initialState: InitialState = {
  employees: [],
  status: 'idle',
  error: null
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(
      fetchEmployees.fulfilled,
      (state, { payload }: PayloadAction<User[]>) => {
        if (state.status === 'loading') {
          state.status = 'succeeded';
          state.employees = payload;
        }
      }
    );

    builder.addCase(fetchEmployees.rejected, (state, action) => {
      if (state.status === 'loading') {
        state.status = 'failed';
        state.error = action.payload;
      }
    });
  }
});

export const employeeSliceReducer = employeeSlice.reducer;
