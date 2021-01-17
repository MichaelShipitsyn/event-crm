import { request } from 'libs/request';
import { User } from 'types/user';

type GetEmployeesParams = {
  limit: number;
  page?: number;
  query: string | null;
};

export type GetEmployeesResult = {
  employees: User[];
  total: number;
};

const getEmployees = async ({
  limit,
  page,
  query
}: GetEmployeesParams): Promise<GetEmployeesResult> => {
  let url = `/employees?limit=${limit}&`;

  if (page) url += `page=${page}&`;
  if (query) url += `query=${query}&`;

  const employeesResponse = await request.get<GetEmployeesResult>(url);
  return {
    employees: employeesResponse.data.employees,
    total: employeesResponse.data.total
  };
};

const updateEmployee = async (employee: User): Promise<void> => {
  await request.put(`/employees/${employee.id}`, employee);
};

const deleteEmployee = async (employeeID: number): Promise<void> => {
  await request.delete(`/employees/${employeeID}`);
};

export const employeeApi = {
  getEmployees,
  updateEmployee,
  deleteEmployee
};
