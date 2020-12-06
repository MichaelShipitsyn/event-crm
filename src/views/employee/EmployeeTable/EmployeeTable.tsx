import React, { useEffect, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchEmployees } from 'store/employee/thunks';
import {
  Button,
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
import { EmployeesList } from './EmployeesList';
import { TableFilters } from './TableFilters';

interface EmployeeTableProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  container: {
    height: 440
  },
  tableCell: {
    height: '77px'
  }
}));

export const EmployeeTable: FC<EmployeeTableProps> = ({ className }) => {
  const classes = useStyles();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const dispatch = useDispatch();
  const { employees, totalEmployeesPages } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    dispatch(fetchEmployees({ page: page + 1, limit }));
  }, [page, limit, dispatch]);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleSelectAllEmployees = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedEmployees(
      event.target.checked ? employees.map((employee) => employee.id) : []
    );
  };

  const handleSelectOneEmployee = (
    event: ChangeEvent<HTMLInputElement>,
    employeeId: number
  ): void => {
    console.log(employeeId);
    if (!selectedEmployees.includes(employeeId)) {
      setSelectedEmployees((prevSelected) => [...prevSelected, employeeId]);
    } else {
      setSelectedEmployees((prevSelected) =>
        prevSelected.filter((id) => id !== employeeId)
      );
    }
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(Number(event.target.value));
  };

  const enableBulkOperations = selectedEmployees.length > 0;
  const selectedSomeEmployees =
    selectedEmployees.length > 0 && selectedEmployees.length < employees.length;
  const selectedAllEmployees = selectedEmployees.length === employees.length;

  return (
    <Card className={clsx(classes.root, className)}>
      <TableFilters />
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllEmployees}
              indeterminate={selectedSomeEmployees}
              onChange={handleSelectAllEmployees}
            />
            <Button variant="outlined" className={classes.bulkAction}>
              Удалить
            </Button>
          </div>
        </div>
      )}
      <TableContainer className={classes.container}>
        {employees.length === 0 && <LinearProgress />}
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllEmployees}
                  indeterminate={selectedSomeEmployees}
                  onChange={handleSelectAllEmployees}
                />
              </TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Электронная почта</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Уровень доступа</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <EmployeesList
              selectedEmployees={selectedEmployees}
              employees={employees}
              handleSelectOneEmployee={handleSelectOneEmployee}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalEmployeesPages}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
