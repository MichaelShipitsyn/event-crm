import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';
import { GetEmployeesResult } from 'api/employee';

type InitialState = {
  employees: User[];
  totalEmployeesPages: number;
  isEmployeesFetchLoading: boolean;
  currentPage: number | null;
  currentRowsPerPage: number | null;
};

const initialState: InitialState = {
  employees: [],
  totalEmployeesPages: 0,
  isEmployeesFetchLoading: false,
  currentPage: null,
  currentRowsPerPage: null
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployeesStart(state) {
      state.isEmployeesFetchLoading = true;
    },
    fetchEmployeesSuccess(
      state,
      { payload }: PayloadAction<GetEmployeesResult>
    ) {
      state.employees = payload.employees;
      state.totalEmployeesPages = payload.total;
      state.isEmployeesFetchLoading = false;
    },
    fetchEmployeesFail(state) {
      state.isEmployeesFetchLoading = false;
    }
  }
});

export const employeeSliceReducer = employeeSlice.reducer;

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFail
} = employeeSlice.actions;
