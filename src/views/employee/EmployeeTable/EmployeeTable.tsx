import {
  Box,
  Card,
  Hidden,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { DeleteWarning, NoTableData } from 'components';
import { useDeleteEmployee, useEditEmployee } from 'hooks/employee';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchEmployeesThunk } from 'store/employee/thunks';
import { EmployeeForm } from 'views/employee/EmployeeForm';

import { EmployeeItem } from './EmployeeItem';
import { StyledTableCell, StyledTableContainer } from './styled';
import { TableFilters } from './TableFilters';

export const EmployeeTable: FC = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const currentRowsPerPage = 15;

  const { editableEmployee, setEditableEmployee, handleEmployeeSave } =
    useEditEmployee();
  const {
    removableEmployeeID,
    setRemovableEmployeeID,
    deleteEmployeeRequestStatus,
    handleDeleteEmployee,
  } = useDeleteEmployee();

  const employees = useSelector((state: RootState) => state.employee.employees);
  const totalEmployees = useSelector(
    (state: RootState) => state.employee.totalEmployees
  );
  const employeesFetchRequestStatus = useSelector(
    (state: RootState) => state.employee.employeesFetchRequestStatus
  );
  const searchQuery = useSelector(
    (state: RootState) => state.employee.searchQuery
  );

  const isEmployeesFetchLoading = employeesFetchRequestStatus === 'loading';

  useEffect(() => {
    dispatch(
      fetchEmployeesThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (searchQuery !== null) {
      dispatch(fetchEmployeesThunk({ limit: currentRowsPerPage }));
    }
  }, [dispatch, searchQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ): void => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Card>
        <TableFilters />
        <StyledTableContainer>
          {employees.length === 0 && isEmployeesFetchLoading && (
            <LinearProgress />
          )}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Электронная почта</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell>Уровень доступа</TableCell>
                <StyledTableCell align="right">Действия</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 && !isEmployeesFetchLoading ? (
                <NoTableData numberColumns={6} />
              ) : (
                <>
                  {employees.map((employee) => {
                    return (
                      <EmployeeItem
                        key={employee.id}
                        employee={employee}
                        onEdit={() => setEditableEmployee(employee)}
                        onDelete={() => setRemovableEmployeeID(employee.id)}
                      />
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Hidden smDown>
          <Box display="flex" justifyContent="center" p="10px">
            <Pagination
              variant="outlined"
              count={Math.floor(totalEmployees / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box pt="10px" pb="10px">
            <Pagination
              count={Math.floor(totalEmployees / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
      </Card>
      {editableEmployee && (
        <EmployeeForm
          onClose={() => setEditableEmployee(null)}
          initialEmployee={editableEmployee}
          onSave={(employee) => handleEmployeeSave(employee)}
        />
      )}
      {removableEmployeeID && (
        <DeleteWarning
          isLoading={deleteEmployeeRequestStatus === 'loading'}
          onCancel={() => setRemovableEmployeeID(null)}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};
