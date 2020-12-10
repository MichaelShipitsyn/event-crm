import React, { useEffect, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  fetchEmployeesThunk,
  deleteEmployeesThunk
} from 'store/employee/thunks';
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
import Pagination from '@material-ui/lab/Pagination';
import type { Theme } from 'theme';
import { DeleteWarning, NoTableData } from 'components';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';
import { User } from 'types/users';
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
  const [removableEmployeeID, setRemovableEmployeeID] = useState<number | null>(
    null
  );
  const [editableEmployee, setEditableEmployee] = useState<User | null>(null);

  const dispatch = useDispatch();

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
  const isDeleteEmployeesStatus = useSelector(
    (state: RootState) => state.employee.isDeleteEmployeesStatus
  );

  useEffect(() => {
    dispatch(
      fetchEmployeesThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch]);

  useEffect(() => {
    if (isRequestFulfilled(isDeleteEmployeesStatus)) {
      setRemovableEmployeeID(null);
    }
  }, [isDeleteEmployeesStatus]);

  const handlePageChange = (event: never, newPage: number): void => {
    dispatch(fetchEmployeesThunk({ page: newPage, limit: currentRowsPerPage }));
  };

  const handleDeleteEmployee = async (): Promise<void> => {
    if (removableEmployeeID) {
      dispatch(deleteEmployeesThunk(removableEmployeeID));
    }
  };

  const handleEditEmployee = async (employee: User) => {
    setEditableEmployee(employee);
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
                        onEdit={() => handleEditEmployee(employee)}
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
