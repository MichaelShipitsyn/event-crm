import React, { useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { fetchClientsThunk } from 'store/client/thunks';
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
import { useEditClient, useDeleteClient } from 'hooks/client';
import Pagination from '@material-ui/lab/Pagination';
import { DeleteWarning, NoTableData } from 'components';
import { ClientItem } from './ClientItem';
import { TableFilters } from './TableFilters';
import { ClientForm } from '../ClientForm';

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

export const ClientTable: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    editableClient,
    setEditableClient,
    handleClientSave
  } = useEditClient();
  const {
    removableClientID,
    setRemovableClientID,
    deleteClientRequestStatus,
    handleDeleteClient
  } = useDeleteClient();

  const clients = useSelector((state: RootState) => state.client.clients);
  const totalClientsPages = useSelector(
    (state: RootState) => state.client.totalClientsPages
  );
  const isClientsFetchLoading = useSelector(
    (state: RootState) => state.client.isClientsFetchLoading
  );
  const currentPage = useSelector(
    (state: RootState) => state.client.currentPage
  );
  const currentRowsPerPage = useSelector(
    (state: RootState) => state.client.currentRowsPerPage
  );

  useEffect(() => {
    dispatch(
      fetchClientsThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage, currentRowsPerPage]);

  const handlePageChange = (event: never, newPage: number): void => {
    dispatch(fetchClientsThunk({ page: newPage, limit: currentRowsPerPage }));
  };

  return (
    <div>
      <Card>
        <TableFilters />
        <TableContainer className={classes.container}>
          {clients.length === 0 && isClientsFetchLoading && <LinearProgress />}
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell>Электронная почта</TableCell>
                <TableCell align="right" className={classes.stickyTableCell}>
                  Действия
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length === 0 && !isClientsFetchLoading ? (
                <NoTableData numberColumns={6} />
              ) : (
                <>
                  {clients.map((client) => {
                    return (
                      <ClientItem
                        key={client.id}
                        client={client}
                        onEdit={() => setEditableClient(client)}
                        onDelete={() => setRemovableClientID(client.id)}
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
              count={Math.floor(totalClientsPages / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box pt="10px" pb="10px">
            <Pagination
              count={Math.floor(totalClientsPages / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
      </Card>
      {editableClient && (
        <ClientForm
          onClose={() => setEditableClient(null)}
          initialClient={editableClient}
          onSave={(client) => handleClientSave(client)}
        />
      )}
      <DeleteWarning
        isLoading={deleteClientRequestStatus === 'loading'}
        isOpen={removableClientID !== null}
        onCancel={() => setRemovableClientID(null)}
        onDelete={handleDeleteClient}
      />
    </div>
  );
};
