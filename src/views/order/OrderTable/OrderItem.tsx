import {
  Box,
  SvgIcon,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { SkeletonWrap } from 'components';
import React from 'react';
import { Trash2 as TrashIcon, User as UserIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Order } from 'types/order';

import { StyledIconButton,StyledTableCell } from './styled'

type Props = {
  order: Order;
  onEdit: () => void;
  onDelete: () => void;
};

export const OrderItem = ({ order, onEdit, onDelete }: Props) => {
  const ordersFetchRequestStatus = useSelector(
    (state: RootState) => state.order.ordersFetchRequestStatus
  );

  const isOrdersFetchLoading = ordersFetchRequestStatus === 'loading';

  return (
    <TableRow key={order.id}>
      <TableCell>
        <SkeletonWrap isLoading={isOrdersFetchLoading}>
          {order.name}
        </SkeletonWrap>
      </TableCell>
      <TableCell>
        <SkeletonWrap isLoading={isOrdersFetchLoading}>
          {order.address}
        </SkeletonWrap>
      </TableCell>
      <TableCell>
        <SkeletonWrap isLoading={isOrdersFetchLoading}>
          {order.cost}
        </SkeletonWrap>
      </TableCell>
      <TableCell>
        <SkeletonWrap isLoading={isOrdersFetchLoading}>
          {order.prepay}
        </SkeletonWrap>
      </TableCell>
      <StyledTableCell align="right">
        <SkeletonWrap isLoading={isOrdersFetchLoading}>
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
