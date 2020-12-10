import { request } from 'libs/request';
import { User } from 'types/users';

type GetEmployeesParams = {
  page: number;
  limit: number;
};

export type GetEmployeesResult = {
  employees: User[];
  total: number;
};

const getEmployees = async ({
  page,
  limit
}: GetEmployeesParams): Promise<GetEmployeesResult> => {
  const employeesResponse = await request.get<GetEmployeesResult>(
    `/employees?page=${page}&limit=${limit}`
  );
  return {
    employees: employeesResponse.data.employees,
    total: employeesResponse.data.total
  };
};

const deleteEmployee = async (employeeID: number): Promise<void> => {
  await request.delete(`/employees/${employeeID}`);
};

export const employeeApi = {
  getEmployees,
  deleteEmployee
};
