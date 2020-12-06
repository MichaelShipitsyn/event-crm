import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from 'api/employee';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (page: number) => {
    return await employeeApi.getEmployees({ page });
  }
);
