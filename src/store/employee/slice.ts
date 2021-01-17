import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/user';
import { GetEmployeesResult } from 'api/employee';

type InitialState = {
  employees: User[];
  totalEmployees: number;
  searchQuery: string | null;
  employeesFetchRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  deleteEmployeeRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
  updateEmployeeRequestStatus: 'idle' | 'loading' | 'success' | 'fail';
};

const initialState: InitialState = {
  employees: [],
  totalEmployees: 0,
  searchQuery: null,
  employeesFetchRequestStatus: 'idle',
  deleteEmployeeRequestStatus: 'idle',
  updateEmployeeRequestStatus: 'idle'
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployeesRequestStart(state) {
      state.employeesFetchRequestStatus = 'loading';
    },
    fetchEmployeesRequestSuccess(
      state,
      { payload }: PayloadAction<GetEmployeesResult>
    ) {
      state.employees = payload.employees;
      state.totalEmployees = payload.total;
      state.employeesFetchRequestStatus = 'success';
    },
    fetchEmployeesRequestFail(state) {
      state.employeesFetchRequestStatus = 'fail';
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
    },
    setSearchQuery(state, { payload }: PayloadAction<string>) {
      state.searchQuery = payload;
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
  setSearchQuery
} = employeeSlice.actions;
