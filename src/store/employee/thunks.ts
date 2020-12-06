import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from 'api/employee';

type FetchEmployeesParams = {
  page: number;
  limit: number;
};

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async ({ page, limit }: FetchEmployeesParams) => {
    return await employeeApi.getEmployees({ page, limit });
  }
);
