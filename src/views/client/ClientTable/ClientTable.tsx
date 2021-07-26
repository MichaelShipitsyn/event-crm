import {
  Box,
  Card,
  Hidden,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { DeleteWarning, NoTableData } from 'components';
import { useDeleteClient } from 'hooks/client';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setClientFormShow, setEditableClient } from 'store/client/slice';
import {
  createClientThunk,
  fetchClientsThunk,
  updateClientThunk,
} from 'store/client/thunks';
import { Client, isNewClient, NewClient } from 'types/client';

import { ClientForm } from 'views/client/ClientForm';
import { ClientItem } from './ClientItem';
import { TableFilters } from './TableFilters';

const useStyles = makeStyles(() => {
  return {
    container: {
      maxHeight: '50vh',
    },
    stickyTableCell: {
      position: 'sticky',
      right: 0,
      background: '#fff',
    },
  };
});

export const ClientTable: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const currentRowsPerPage = 15;

  const {
    removableClientID,
    setRemovableClientID,
    deleteClientRequestStatus,
    handleDeleteClient,
  } = useDeleteClient();

  const clients = useSelector((state: RootState) => state.client.clients);
  const totalClients = useSelector(
    (state: RootState) => state.client.totalClients
  );
  const clientsFetchRequestStatus = useSelector(
    (state: RootState) => state.client.clientsFetchRequestStatus
  );
  const searchQuery = useSelector(
    (state: RootState) => state.client.searchQuery
  );

  const editableClient = useSelector(
    (state: RootState) => state.client.editableClient
  );
  const isClientFormShow = useSelector(
    (state: RootState) => state.client.isClientFormShow
  );

  const isClientsFetchLoading = clientsFetchRequestStatus === 'loading';

  useEffect(() => {
    dispatch(
      fetchClientsThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (searchQuery !== null) {
      dispatch(fetchClientsThunk({ limit: currentRowsPerPage }));
    }
  }, [dispatch, searchQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ): void => {
    setCurrentPage(newPage);
  };

  const handleClientSave = (client: Client | NewClient) => {
    if (isNewClient(client)) {
      dispatch(createClientThunk(client));
    } else {
      dispatch(updateClientThunk(client));
    }
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
                        onEdit={() => dispatch(setEditableClient(client))}
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
              count={Math.floor(totalClients / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box pt="10px" pb="10px">
            <Pagination
              count={Math.floor(totalClients / currentRowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Hidden>
      </Card>
      {isClientFormShow && (
        <ClientForm
          onClose={() => dispatch(setClientFormShow(false))}
          initialClient={editableClient}
          onSave={handleClientSave}
        />
      )}
      {removableClientID && (
        <DeleteWarning
          isLoading={deleteClientRequestStatus === 'loading'}
          onCancel={() => setRemovableClientID(null)}
          onDelete={handleDeleteClient}
        />
      )}
    </div>
  );
};
