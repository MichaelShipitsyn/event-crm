import { employeeApi } from 'api/employee';
import type { AppThunk } from 'store';
import {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFail,
  deleteEmployeesStart,
  deleteEmployeesSuccess,
  deleteEmployeesFail
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
    dispatch(fetchEmployeesStart({ page, limit }));
    const employees = await employeeApi.getEmployees({ page, limit });
    dispatch(fetchEmployeesSuccess(employees));
  } catch (err) {
    dispatch(fetchEmployeesFail());
  }
};

export const deleteEmployeesThunk = (employees: number[]): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(deleteEmployeesStart());
    await employeeApi.deleteEmployees(employees);
    dispatch(deleteEmployeesSuccess());

    const page = getState().employee.currentPage;
    const limit = getState().employee.currentRowsPerPage;
    dispatch(fetchEmployeesThunk({ page, limit }));
  } catch (err) {
    dispatch(deleteEmployeesFail());
  }
};
