import React, { useEffect, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchEmployees } from 'store/employee/thunks';
import { SkeletonWrap } from 'components';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  Link,
  SvgIcon,
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
import { Edit as EditIcon, ArrowRight as ArrowRightIcon } from 'react-feather';
import type { Theme } from 'theme';
import { getUserFullName } from 'utils/getUserFullName';
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

  const isEmployeesFetchLoading = useSelector(
    (state: RootState) => state.employee.isEmployeesFetchLoading
  );

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
            {employees.map((employee) => {
              const isEmployeeSelected = selectedEmployees.includes(
                employee.id
              );

              return (
                <TableRow hover key={employee.id} selected={isEmployeeSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isEmployeeSelected}
                      onChange={(event) =>
                        handleSelectOneEmployee(event, employee.id)
                      }
                      value={isEmployeeSelected}
                    />
                  </TableCell>
                  <TableCell
                    classes={{
                      root: classes.tableCell
                    }}
                  >
                    <SkeletonWrap isLoading={isEmployeesFetchLoading}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          className={classes.avatar}
                          src={employee.avatar}
                          alt={employee.firstname}
                        />
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to="/app/management/employees/1"
                            variant="h6"
                          >
                            {getUserFullName(employee)}
                          </Link>
                        </div>
                      </Box>
                    </SkeletonWrap>
                  </TableCell>
                  <TableCell>
                    <SkeletonWrap isLoading={isEmployeesFetchLoading}>
                      {employee.email}
                    </SkeletonWrap>
                  </TableCell>
                  <TableCell>
                    <SkeletonWrap isLoading={isEmployeesFetchLoading}>
                      {employee.phone}
                    </SkeletonWrap>
                  </TableCell>
                  <TableCell>
                    <SkeletonWrap isLoading={isEmployeesFetchLoading}>
                      {employee.is_admin ? 'Администратор' : 'Сотрудник'}
                    </SkeletonWrap>
                  </TableCell>
                  <TableCell align="right">
                    <SkeletonWrap isLoading={isEmployeesFetchLoading}>
                      <IconButton
                        component={RouterLink}
                        to="/app/management/employees/1/edit"
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to="/app/management/employees/1"
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </SkeletonWrap>
                  </TableCell>
                </TableRow>
              );
            })}
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
