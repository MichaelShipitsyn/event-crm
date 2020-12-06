import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';
import { fetchEmployees } from './thunks';
import { GetEmployeesResult } from 'api/employee';

type InitialState = {
  employees: User[];
  totalEmployeesPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: unknown;
};

const initialState: InitialState = {
  employees: [],
  totalEmployeesPages: 0,
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
      (state, { payload }: PayloadAction<GetEmployeesResult>) => {
        if (state.status === 'loading') {
          state.employees = payload.employees;
          state.totalEmployeesPages = payload.total;
          state.status = 'succeeded';
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
