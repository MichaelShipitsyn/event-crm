import {
  Avatar,
  Box,
  Hidden,
  IconButton,
  makeStyles,
  SvgIcon,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { SkeletonWrap } from 'components';
import React from 'react';
import { Trash2 as TrashIcon, User as UserIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import type { Theme } from 'theme';
import { User } from 'types/user';
import { getUserFullName } from 'utils/getUserFullName';

type EmployeeItemProps = {
  employee: User;
  onEdit: () => void;
  onDelete: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  stickyTableCell: {
    position: 'sticky',
    right: 0,
    background: '#fff',
  },
  iconButton: {
    border: '1px solid rgba(84, 110, 122, 0.3)',
    padding: '5px',
    '&:hover': {
      backgroundColor: 'rgba(84, 110, 122, 0.15)',
    },
  },
}));

export const EmployeeItem = ({
  employee,
  onEdit,
  onDelete,
}: EmployeeItemProps) => {
  const classes = useStyles();

  const employeesFetchRequestStatus = useSelector(
    (state: RootState) => state.employee.employeesFetchRequestStatus
  );

  const isEmployeesFetchLoading = employeesFetchRequestStatus === 'loading';

  return (
    <TableRow key={employee.id}>
      <TableCell>
        <SkeletonWrap isLoading={isEmployeesFetchLoading}>
          <Box display="flex" alignItems="center">
            <Hidden smDown>
              <Avatar
                className={classes.avatar}
                src={employee?.avatar ?? ''}
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
      <TableCell align="right" className={classes.stickyTableCell}>
        <SkeletonWrap isLoading={isEmployeesFetchLoading}>
          <Box mr="5px" clone>
            <IconButton
              classes={{ root: classes.iconButton }}
              onClick={() => onEdit()}
            >
              <SvgIcon fontSize="small">
                <UserIcon />
              </SvgIcon>
            </IconButton>
          </Box>
          <IconButton
            classes={{ root: classes.iconButton }}
            onClick={() => onDelete()}
          >
            <SvgIcon fontSize="small">
              <TrashIcon />
            </SvgIcon>
          </IconButton>
        </SkeletonWrap>
      </TableCell>
    </TableRow>
  );
};
