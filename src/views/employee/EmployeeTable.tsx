import React, { useEffect, useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { getUserFullName } from 'utils/getUserFullName';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchEmployees } from 'store/employee/thunks';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  LinearProgress,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import type { Theme } from 'theme';
import { User } from 'types/users';

interface EmployeeTableProps {
  className?: string;
}

type Sort = 'updatedAt|desc' | 'updatedAt|asc' | 'orders|desc' | 'orders|asc';

interface SortOption {
  value: Sort;
  label: string;
}

const sortOptions: SortOption[] = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)'
  }
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  queryField: {
    width: 300
  },
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
  searchButton: {
    marginLeft: '10px'
  }
}));

export const EmployeeTable: FC<EmployeeTableProps> = ({ className }) => {
  const classes = useStyles();
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);

  const dispatch = useDispatch();
  const { employees, totalEmployeesPages } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    console.log(page);
    dispatch(fetchEmployees(page + 1));
  }, [dispatch, page]);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const statusEmployeesFetch = useSelector(
    (state: RootState) => state.employee.status
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setSort(event.target.value as Sort);
  };

  const handleSelectAllEmployees = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedEmployees(
      event.target.checked ? employees.map((employee) => employee.id) : []
    );
  };

  const handleSearch = (): void => {
    console.log(query);
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
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <TextField
          label="Выбрать:"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Box flexGrow={1} />
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Поиск..."
          value={query}
          variant="outlined"
        />
        <Button
          className={classes.searchButton}
          variant="outlined"
          onClick={handleSearch}
        >
          Поиск
        </Button>
      </Box>
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
      <PerfectScrollbar>
        <Box minWidth={700}>
          {statusEmployeesFetch === 'loading' && <LinearProgress />}
          <Table>
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
                  <TableRow
                    hover
                    key={employee.id}
                    selected={isEmployeeSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isEmployeeSelected}
                        onChange={(event) =>
                          handleSelectOneEmployee(event, employee.id)
                        }
                        value={isEmployeeSelected}
                      />
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>
                      {employee.is_admin ? 'Администратор' : 'Сотрудник'}
                    </TableCell>
                    <TableCell align="right">
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalEmployeesPages}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
