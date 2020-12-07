import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from 'api/employee';
import type { AppThunk } from 'store';
import {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFail
} from './slice';

type FetchEmployeesParams = {
  page: number;
  limit: number;
};

export const fetchEmployeesThunk = ({
  page,
  limit
}: FetchEmployeesParams): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchEmployeesStart());
    const employees = await employeeApi.getEmployees({ page, limit });
    dispatch(fetchEmployeesSuccess(employees));
  } catch (err) {
    dispatch(fetchEmployeesFail());
  }
};

export const deleteEmployeesThunk = createAsyncThunk(
  'employee/deleteEmployees',
  async (employees: number[]) => {
    return employeeApi.deleteEmployees(employees);
  }
);
