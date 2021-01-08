import { employeeApi } from 'api/employee';
import type { AppThunk } from 'store';
import { User } from 'types/users';
import {
  fetchEmployeesRequestStart,
  fetchEmployeesRequestSuccess,
  fetchEmployeesRequestFail,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFail,
  updateEmployeeRequestStart,
  updateEmployeeRequestSuccess,
  updateEmployeeRequestFail
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
    dispatch(fetchEmployeesRequestStart({ page, limit }));
    const employees = await employeeApi.getEmployees({ page, limit });
    dispatch(fetchEmployeesRequestSuccess(employees));
  } catch (err) {
    dispatch(fetchEmployeesRequestFail());
  }
};

export const updateEmployeesThunk = (employee: User): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(updateEmployeeRequestStart());
    await employeeApi.updateEmployee(employee);
    dispatch(updateEmployeeRequestSuccess());

    const page = getState().employee.currentPage;
    const limit = getState().employee.currentRowsPerPage;
    dispatch(fetchEmployeesThunk({ page, limit }));
  } catch (err) {
    dispatch(updateEmployeeRequestFail());
  }
};

export const deleteEmployeesThunk = (employeeID: number): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(deleteEmployeeStart());
    await employeeApi.deleteEmployee(employeeID);
    dispatch(deleteEmployeeSuccess());

    const page = getState().employee.currentPage;
    const limit = getState().employee.currentRowsPerPage;
    dispatch(fetchEmployeesThunk({ page, limit }));
  } catch (err) {
    dispatch(deleteEmployeeFail());
  }
};
