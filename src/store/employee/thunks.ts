import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from 'api/employee';

type FetchEmployeesParams = {
  page: number;
  limit: number;
};

export const fetchEmployeesThunk = createAsyncThunk(
  'employee/fetchEmployees',
  async ({ page, limit }: FetchEmployeesParams) => {
    return await employeeApi.getEmployees({ page, limit });
  }
);

export const deleteEmployeesThunk = createAsyncThunk(
  'employee/deleteEmployees',
  async (employees: number[]) => {
    return employeeApi.deleteEmployees(employees);
  }
);
