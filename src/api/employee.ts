import { request } from 'libs/request';
import { User } from 'types/user';

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
