import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/user';
import { GetEmployeesResult } from 'api/employee';

type InitialState = {
  employees: User[];
  totalEmployeesPages: number;
  isEmployeesFetchLoading: boolean;
  deleteEmployeeRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateEmployeeRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
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
  deleteEmployeeRequestStatus: 'idle',
  updateEmployeeRequestStatus: 'idle',
  currentPage: 1,
  currentRowsPerPage: 15
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployeesRequestStart(
      state,
      { payload }: PayloadAction<FetchEmployeesStartPayload>
    ) {
      state.isEmployeesFetchLoading = true;
      state.currentPage = payload.page;
      state.currentRowsPerPage = payload.limit;
    },
    fetchEmployeesRequestSuccess(
      state,
      { payload }: PayloadAction<GetEmployeesResult>
    ) {
      state.employees = payload.employees;
      state.totalEmployeesPages = payload.total;
      state.isEmployeesFetchLoading = false;
    },
    fetchEmployeesRequestFail(state) {
      state.isEmployeesFetchLoading = false;
    },
    deleteEmployeeStart(state) {
      state.deleteEmployeeRequestStatus = 'loading';
    },
    deleteEmployeeSuccess(state) {
      state.deleteEmployeeRequestStatus = 'success';
    },
    deleteEmployeeFail(state) {
      state.deleteEmployeeRequestStatus = 'fail';
    },
    updateEmployeeRequestStart(state) {
      state.updateEmployeeRequestStatus = 'loading';
    },
    updateEmployeeRequestSuccess(state) {
      state.updateEmployeeRequestStatus = 'success';
    },
    updateEmployeeRequestFail(state) {
      state.updateEmployeeRequestStatus = 'fail';
    },
    updateEmployee(state, { payload }: PayloadAction<User>) {
      const index = state.employees.findIndex(
        (employee) => employee.id === payload.id
      );
      state.employees[index] = payload;
    }
  }
});

export const employeeSliceReducer = employeeSlice.reducer;

export const {
  fetchEmployeesRequestStart,
  fetchEmployeesRequestSuccess,
  fetchEmployeesRequestFail,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFail,
  updateEmployeeRequestStart,
  updateEmployeeRequestSuccess,
  updateEmployeeRequestFail,
  updateEmployee
} = employeeSlice.actions;
