import type { AppThunk } from 'store';
import { employeeApi } from 'api/employee';
import { setEmployees } from './slice';

export const fetchEmployees = (): AppThunk => async (dispatch) => {
  const employees = await employeeApi.getEmployees();
  dispatch(setEmployees(employees));
};
