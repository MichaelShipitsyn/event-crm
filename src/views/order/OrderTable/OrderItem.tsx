import {
  Box,
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
import { Order } from 'types/order';

type Props = {
  order: Order;
  onEdit: () => void;
  onDelete: () => void;
};

const useStyles = makeStyles(() => ({
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

export const OrderItem = ({ order, onEdit, onDelete }: Props) => {
  const classes = useStyles();

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
      <TableCell align="right" className={classes.stickyTableCell}>
        <SkeletonWrap isLoading={isOrdersFetchLoading}>
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
