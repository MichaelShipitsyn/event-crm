import { request } from 'libs/request';
import { User } from 'types/users';

const getEmployees = async () => {
  const employeesResponse = await request.get<{ employees: User[] }>('/employees');
  return employeesResponse.data.employees;
};

export const employeeApi = {
  getEmployees
};
