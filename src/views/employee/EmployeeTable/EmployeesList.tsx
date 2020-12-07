import React from 'react';
import type { FC, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from 'store';
import { SkeletonWrap } from 'components';
import { User } from 'types/users';
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  SvgIcon,
  TableCell,
  TableRow,
  makeStyles,
  Hidden
} from '@material-ui/core';
import { Edit as EditIcon, ArrowRight as ArrowRightIcon } from 'react-feather';
import type { Theme } from 'theme';
import { getUserFullName } from 'utils/getUserFullName';
import { useSelector } from 'react-redux';

type EmployeeListProps = {
  employees: User[];
  selectedEmployees: number[];
  handleSelectOneEmployee: (
    event: ChangeEvent<HTMLInputElement>,
    employeeId: number
  ) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  tableCell: {
    height: '77px'
  }
}));

export const EmployeesList: FC<EmployeeListProps> = ({
  employees,
  selectedEmployees,
  handleSelectOneEmployee
}) => {
  const classes = useStyles();

  const isEmployeesFetchLoading = useSelector(
    (state: RootState) => state.employee.isEmployeesFetchLoading
  );

  return (
    <>
      {employees.map((employee) => {
        const isEmployeeSelected = selectedEmployees.includes(employee.id);

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
                  <Hidden smDown>
                    <Avatar
                      className={classes.avatar}
                      src={employee.avatar}
                      alt={employee.firstname}
                    />
                  </Hidden>
                  <div>{getUserFullName(employee)}</div>
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
    </>
  );
};