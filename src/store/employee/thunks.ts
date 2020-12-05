import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from 'api/employee';
import { getCache } from 'store/cache/selector';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (dispatch, { getState }) => {
    const cache: string[] = getCache(getState());
    return await employeeApi.getEmployees({ cache });
  }
);
