import React, { useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  fetchOrdersThunk,
  updateOrderThunk,
  createOrderThunk
} from 'store/order/thunks';
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
import { setEditableOrder, setOrderFormShow } from 'store/order/slice';
import { NewOrder, Order, isNewOrder } from 'types/order';
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

  const {
    removableOrderID,
    setRemovableOrderID,
    deleteOrderRequestStatus,
    handleDeleteOrder
  } = useDeleteOrder();

  const Orders = useSelector((state: RootState) => state.order.orders);
  const totalOrdersPages = useSelector(
    (state: RootState) => state.order.totalOrdersPages
  );
  const isOrdersFetchLoading = useSelector(
    (state: RootState) => state.order.isOrdersFetchLoading
  );
  const currentPage = useSelector(
    (state: RootState) => state.order.currentPage
  );
  const currentRowsPerPage = useSelector(
    (state: RootState) => state.order.currentRowsPerPage
  );
  const editableOrder = useSelector(
    (state: RootState) => state.order.editableOrder
  );
  const isOrderFormShow = useSelector(
    (state: RootState) => state.order.isOrderFormShow
  );

  useEffect(() => {
    dispatch(
      fetchOrdersThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage, currentRowsPerPage]);

  const handlePageChange = (event: never, newPage: number): void => {
    dispatch(fetchOrdersThunk({ page: newPage, limit: currentRowsPerPage }));
  };

  const handleOrderSave = (order: Order | NewOrder) => {
    if (isNewOrder(order)) {
      dispatch(createOrderThunk(order));
    } else {
      dispatch(updateOrderThunk(order));
    }
  };

  return (
    <div>
      <Card>
        <TableFilters />
        <TableContainer className={classes.container}>
          {Orders.length === 0 && isOrdersFetchLoading && <LinearProgress />}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Адрес</TableCell>
                <TableCell>Стоимость</TableCell>
                <TableCell>Предоплата</TableCell>
                <TableCell align="right" className={classes.stickyTableCell}>
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Orders.length === 0 && !isOrdersFetchLoading ? (
                <NoTableData numberColumns={6} />
              ) : (
                <>
                  {Orders.map((order) => {
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
              count={Math.floor(totalOrdersPages / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box pt="10px" pb="10px">
            <Pagination
              count={Math.floor(totalOrdersPages / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
      </Card>
      {isOrderFormShow && (
        <OrderForm
          onClose={() => dispatch(setOrderFormShow(false))}
          initialOrder={editableOrder}
          onSave={handleOrderSave}
        />
      )}
      <DeleteWarning
        isLoading={deleteOrderRequestStatus === 'loading'}
        isOpen={removableOrderID !== null}
        onCancel={() => setRemovableOrderID(null)}
        onDelete={handleDeleteOrder}
      />
    </div>
  );
};
