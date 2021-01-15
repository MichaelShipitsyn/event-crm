import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/user';
import { GetEmployeesResult } from 'api/employee';

type InitialState = {
  employees: User[];
  totalEmployeesPages: number;
  isEmployeesFetchLoading: boolean;
  deleteEmployeeRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateEmployeeRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
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
  updateEmployeeRequestStatus: 'idle'
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
    deleteEmployeeSuccess(state, { payload }: PayloadAction<number>) {
      state.deleteEmployeeRequestStatus = 'success';
      const index = state.employees.findIndex(
        (employee) => employee.id === payload
      );
      state.employees.splice(index, 1);
    },
    deleteEmployeeFail(state) {
      state.deleteEmployeeRequestStatus = 'fail';
    },
    updateEmployeeRequestStart(state) {
      state.updateEmployeeRequestStatus = 'loading';
    },
    updateEmployeeRequestSuccess(state, { payload }: PayloadAction<User>) {
      state.updateEmployeeRequestStatus = 'success';
      const index = state.employees.findIndex(
        (employee) => employee.id === payload.id
      );
      state.employees[index] = payload;
    },
    updateEmployeeRequestFail(state) {
      state.updateEmployeeRequestStatus = 'fail';
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
  updateEmployeeRequestFail
} = employeeSlice.actions;
