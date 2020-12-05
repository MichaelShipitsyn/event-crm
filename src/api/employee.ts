import { request } from 'libs/request';
import { User } from 'types/users';

type GetEmployeesParams = {
  cache: string[];
};

const getEmployees = async ({ cache }: GetEmployeesParams) => {
  const employeesResponse = await request.get<{ employees: User[] }>(
    '/employees'
  );
  return employeesResponse.data.employees;
};

export const employeeApi = {
  getEmployees
};
