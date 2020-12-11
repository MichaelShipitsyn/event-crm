import React, { useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchEmployeesThunk } from 'store/employee/thunks';
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  makeStyles,
  TableContainer,
  Hidden
} from '@material-ui/core';
import { useEditEmployee, useDeleteEmployee } from 'hooks/employee';
import Pagination from '@material-ui/lab/Pagination';
import type { Theme } from 'theme';
import { DeleteWarning, NoTableData } from 'components';
import { EmployeeItem } from './EmployeeItem';
import { TableFilters } from './TableFilters';
import { EmployeeCard } from './EmployeeCard';

const useStyles = makeStyles((theme: Theme) => {
  return {
    avatar: {
      height: 42,
      width: 42,
      marginRight: theme.spacing(1)
    },
    container: {
      maxHeight: '50vh'
    },
    stickyTableCell: {
      position: 'sticky',
      right: 0,
      background: '#fff'
    }
  };
});

export const EmployeeTable: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    editableEmployee,
    setEditableEmployee,
    handleEmployeeSave
  } = useEditEmployee();
  const {
    removableEmployeeID,
    setRemovableEmployeeID,
    isDeleteEmployeesStatus,
    handleDeleteEmployee
  } = useDeleteEmployee();

  const employees = useSelector((state: RootState) => state.employee.employees);
  const totalEmployeesPages = useSelector(
    (state: RootState) => state.employee.totalEmployeesPages
  );
  const isEmployeesFetchLoading = useSelector(
    (state: RootState) => state.employee.isEmployeesFetchLoading
  );
  const currentPage = useSelector(
    (state: RootState) => state.employee.currentPage
  );
  const currentRowsPerPage = useSelector(
    (state: RootState) => state.employee.currentRowsPerPage
  );

  useEffect(() => {
    dispatch(
      fetchEmployeesThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage, currentRowsPerPage]);

  const handlePageChange = (event: never, newPage: number): void => {
    dispatch(fetchEmployeesThunk({ page: newPage, limit: currentRowsPerPage }));
  };

  return (
    <div>
      <Card>
        <TableFilters />
        <TableContainer className={classes.container}>
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
                <TableCell align="right" className={classes.stickyTableCell}>
                  Действия
                </TableCell>
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
        </TableContainer>
        <Hidden smDown>
          <Box display="flex" justifyContent="center" p="10px">
            <Pagination
              variant="outlined"
              count={Math.floor(totalEmployeesPages / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box pt="10px" pb="10px">
            <Pagination
              count={Math.floor(totalEmployeesPages / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
      </Card>
      {editableEmployee && (
        <EmployeeCard
          onClose={() => setEditableEmployee(null)}
          initialEmployee={editableEmployee}
          handleEmployeeSave={(employee) => handleEmployeeSave(employee)}
        />
      )}
      <DeleteWarning
        isLoading={isDeleteEmployeesStatus === 'loading'}
        isOpen={removableEmployeeID !== null}
        onCancel={() => setRemovableEmployeeID(null)}
        onDelete={handleDeleteEmployee}
      />
    </div>
  );
};
