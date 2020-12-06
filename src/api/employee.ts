import { request } from 'libs/request';
import { User } from 'types/users';

type GetEmployeesParams = {
  page: number;
};

export type GetEmployeesResult = {
  employees: User[];
  total: number;
};

const getEmployees = async ({
  page
}: GetEmployeesParams): Promise<GetEmployeesResult> => {
  const employeesResponse = await request.get<GetEmployeesResult>(
    `/employees?page=${page}`
  );
  return {
    employees: employeesResponse.data.employees,
    total: employeesResponse.data.total
  };
};

export const employeeApi = {
  getEmployees
};
