import { employeeApi } from 'api/employee';
import type { AppThunk } from 'store';
import { User } from 'types/user';
import { showAlert } from 'store/global/slice';
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
  limit: number;
  page?: number;
};

export const fetchEmployeesThunk = ({
  page = 1,
  limit
}: FetchEmployeesParams): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(fetchEmployeesRequestStart());
    const employees = await employeeApi.getEmployees({
      page,
      limit,
      query: getState().employee.searchQuery
    });
    dispatch(fetchEmployeesRequestSuccess(employees));
  } catch (err) {
    dispatch(fetchEmployeesRequestFail());
  }
};

export const updateEmployeesThunk = (employee: User): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(updateEmployeeRequestStart());
    await employeeApi.updateEmployee(employee);
    dispatch(updateEmployeeRequestSuccess(employee));
    dispatch(
      showAlert({
        alertMessage: 'Сотрудник успешно обновлён',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(updateEmployeeRequestFail());
  }
};

export const deleteEmployeesThunk = (employeeId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(deleteEmployeeStart());
    await employeeApi.deleteEmployee(employeeId);
    dispatch(deleteEmployeeSuccess(employeeId));
    dispatch(
      showAlert({
        alertMessage: 'Сотрудник успешно удалён',
        alertType: 'success'
      })
    );
  } catch (err) {
    dispatch(deleteEmployeeFail());
  }
};
