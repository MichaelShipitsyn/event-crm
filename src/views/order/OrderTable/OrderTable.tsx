import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchOrdersThunk } from 'store/order/thunks';
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
import { useDeleteOrder } from 'hooks/order';
import Pagination from '@material-ui/lab/Pagination';
import { DeleteWarning, NoTableData } from 'components';
import { setEditableOrder } from 'store/order/slice';
import { OrderItem } from './OrderItem';
import { TableFilters } from './TableFilters';
import { OrderForm } from '../OrderForm';

const useStyles = makeStyles(() => {
  return {
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

export const OrderTable: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const currentRowsPerPage = 15;

  const {
    removableOrderID,
    setRemovableOrderID,
    deleteOrderRequestStatus,
    handleDeleteOrder
  } = useDeleteOrder();

  const orders = useSelector((state: RootState) => state.order.orders);
  const totalOrders = useSelector(
    (state: RootState) => state.order.totalOrders
  );
  const ordersFetchRequestStatus = useSelector(
    (state: RootState) => state.order.ordersFetchRequestStatus
  );
  const editableOrder = useSelector(
    (state: RootState) => state.order.editableOrder
  );
  const isOrderFormShow = useSelector(
    (state: RootState) => state.order.isOrderFormShow
  );

  const isOrdersFetchLoading = ordersFetchRequestStatus === 'loading';

  useEffect(() => {
    dispatch(
      fetchOrdersThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage]);

  const handlePageChange = (event: never, newPage: number): void => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Card>
        <TableFilters />
        <TableContainer className={classes.container}>
          {orders.length === 0 && isOrdersFetchLoading && <LinearProgress />}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Название заказа</TableCell>
                <TableCell>Адрес</TableCell>
                <TableCell>Стоимость</TableCell>
                <TableCell>Предоплата</TableCell>
                <TableCell align="right" className={classes.stickyTableCell}>
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length === 0 && !isOrdersFetchLoading ? (
                <NoTableData numberColumns={6} />
              ) : (
                <>
                  {orders.map((order) => {
                    return (
                      <OrderItem
                        key={order.id}
                        order={order}
                        onEdit={() => dispatch(setEditableOrder(order))}
                        onDelete={() => setRemovableOrderID(order.id)}
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
              count={Math.floor(totalOrders / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box pt="10px" pb="10px">
            <Pagination
              count={Math.floor(totalOrders / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
      </Card>
      {isOrderFormShow && <OrderForm initialOrder={editableOrder} />}
      {removableOrderID && (
        <DeleteWarning
          isLoading={deleteOrderRequestStatus === 'loading'}
          onCancel={() => setRemovableOrderID(null)}
          onDelete={handleDeleteOrder}
        />
      )}
    </div>
  );
};
