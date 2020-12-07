import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';
import { GetEmployeesResult } from 'api/employee';
import { fetchEmployeesThunk, deleteEmployeesThunk } from './thunks';

type InitialState = {
  employees: User[];
  totalEmployeesPages: number;
  isEmployeesFetchLoading: boolean;
  error: unknown;
};

const initialState: InitialState = {
  employees: [],
  totalEmployeesPages: 0,
  isEmployeesFetchLoading: false,
  error: null
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeesThunk.pending, (state) => {
      state.isEmployeesFetchLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchEmployeesThunk.fulfilled,
      (state, { payload }: PayloadAction<GetEmployeesResult>) => {
        state.employees = payload.employees;
        state.totalEmployeesPages = payload.total;
        state.isEmployeesFetchLoading = false;
      }
    );
    builder.addCase(fetchEmployeesThunk.rejected, (state, action) => {
      if (state.isEmployeesFetchLoading) {
        state.isEmployeesFetchLoading = false;
        state.error = action.payload;
      }
    });
  }
});

export const employeeSliceReducer = employeeSlice.reducer;
