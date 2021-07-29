import {
  Box,
  Hidden,
  SvgIcon,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { SkeletonWrap } from 'components';
import React from 'react';
import { Trash2 as TrashIcon, User as UserIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { User } from 'types/user';
import { getUserFullName } from 'utils/getUserFullName';

import { StyledAvatar, StyledIconButton,StyledTableCell } from './styled'

type EmployeeItemProps = {
  employee: User;
  onEdit: () => void;
  onDelete: () => void;
};

export const EmployeeItem = ({
  employee,
  onEdit,
  onDelete,
}: EmployeeItemProps) => {
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
              <StyledAvatar
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
      <StyledTableCell align="right">
        <SkeletonWrap isLoading={isEmployeesFetchLoading}>
          <Box mr="5px" clone>
            <StyledIconButton
              onClick={() => onEdit()}
            >
              <SvgIcon fontSize="small">
                <UserIcon />
              </SvgIcon>
            </StyledIconButton>
          </Box>
          <StyledIconButton
            onClick={() => onDelete()}
          >
            <SvgIcon fontSize="small">
              <TrashIcon />
            </SvgIcon>
          </StyledIconButton>
        </SkeletonWrap>
      </StyledTableCell>
    </TableRow>
  );
};
