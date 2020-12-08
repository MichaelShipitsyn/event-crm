import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';
import { GetEmployeesResult } from 'api/employee';

type InitialState = {
  employees: User[];
  totalEmployeesPages: number;
  isEmployeesFetchLoading: boolean;
  isDeleteEmployeesStatus: 'idle' | 'loading' | 'success' | 'fail';
  currentPage: number;
  currentRowsPerPage: number;
};

type FetchEmployeesStartPayload = {
  page: number;
  limit: number;
};

const initialState: InitialState = {
  employees: [],
  totalEmployeesPages: 0,
  isEmployeesFetchLoading: false,
  isDeleteEmployeesStatus: 'idle',
  currentPage: 1,
  currentRowsPerPage: 15
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployeesStart(
      state,
      { payload }: PayloadAction<FetchEmployeesStartPayload>
    ) {
      state.isEmployeesFetchLoading = true;
      state.currentPage = payload.page;
      state.currentRowsPerPage = payload.limit;
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
    },
    deleteEmployeesStart(state) {
      state.isDeleteEmployeesStatus = 'loading';
    },
    deleteEmployeesSuccess(state) {
      state.isDeleteEmployeesStatus = 'success';
    },
    deleteEmployeesFail(state) {
      state.isDeleteEmployeesStatus = 'fail';
    }
  }
});

export const employeeSliceReducer = employeeSlice.reducer;

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFail,
  deleteEmployeesStart,
  deleteEmployeesSuccess,
  deleteEmployeesFail
} = employeeSlice.actions;
