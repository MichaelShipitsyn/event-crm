import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';
import { GetEmployeesResult } from 'api/employee';
import { fetchEmployees } from './thunks';

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
    builder.addCase(fetchEmployees.pending, (state) => {
      state.isEmployeesFetchLoading = true;
      state.error = null;
    });

    builder.addCase(
      fetchEmployees.fulfilled,
      (state, { payload }: PayloadAction<GetEmployeesResult>) => {
        if (state.isEmployeesFetchLoading) {
          state.employees = payload.employees;
          state.totalEmployeesPages = payload.total;
          state.isEmployeesFetchLoading = false;
        }
      }
    );

    builder.addCase(fetchEmployees.rejected, (state, action) => {
      if (state.isEmployeesFetchLoading) {
        state.isEmployeesFetchLoading = false;
        state.error = action.payload;
      }
    });
  }
});

export const employeeSliceReducer = employeeSlice.reducer;
