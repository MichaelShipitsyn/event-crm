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
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  LinearProgress,
  makeStyles,
  TableContainer
} from '@material-ui/core';
import type { Theme } from 'theme';
import { DeleteWarning, NoTableData } from 'components';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';
import { EmployeeItem } from './EmployeeItem';
import { TableFilters } from './TableFilters';

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
  const [deleteWarningOpen, setDeleteWarningOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const employees = useSelector((state: RootState) => state.employee.employees);
  const totalEmployeesPages = useSelector(
    (state: RootState) => state.employee.totalEmployeesPages
  );
  const isEmployeesFetchLoading = useSelector(
    (state: RootState) => state.employee.isEmployeesFetchLoading
  );
  const currentPage =
    useSelector((state: RootState) => state.employee.currentPage) - 1;
  const currentRowsPerPage = useSelector(
    (state: RootState) => state.employee.currentRowsPerPage
  );
  const isDeleteEmployeesStatus = useSelector(
    (state: RootState) => state.employee.isDeleteEmployeesStatus
  );

  useEffect(() => {
    dispatch(
      fetchEmployeesThunk({ page: currentPage + 1, limit: currentRowsPerPage })
    );
  }, [dispatch]);

  useEffect(() => {
    if (isRequestFulfilled(isDeleteEmployeesStatus)) {
      setDeleteWarningOpen(false);
    }
  }, [isDeleteEmployeesStatus]);

  const handlePageChange = (event: any, newPage: number): void => {
    dispatch(
      fetchEmployeesThunk({ page: newPage + 1, limit: currentRowsPerPage })
    );
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      fetchEmployeesThunk({
        page: currentPage + 1,
        limit: Number(event.target.value)
      })
    );
  };

  const deleteEmployees = async (): Promise<void> => {
    // dispatch(deleteEmployeesThunk(selectedEmployees));
  };

  const cancelDeleteWarningOpen = (): void => {
    setDeleteWarningOpen(false);
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
                      <EmployeeItem key={employee.id} employee={employee} />
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalEmployeesPages}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={currentPage}
          rowsPerPage={currentRowsPerPage}
          rowsPerPageOptions={[15, 50, 100]}
        />
      </Card>
      <DeleteWarning
        isLoading={isDeleteEmployeesStatus === 'loading'}
        deleteWarningOpen={deleteWarningOpen}
        onCancel={cancelDeleteWarningOpen}
        onDelete={deleteEmployees}
      />
    </div>
  );
};
