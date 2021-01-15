import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  fetchClientsThunk,
  updateClientThunk,
  createClientThunk
} from 'store/client/thunks';
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
import { useDeleteClient } from 'hooks/client';
import Pagination from '@material-ui/lab/Pagination';
import { DeleteWarning, NoTableData } from 'components';
import { setEditableClient, setClientFormShow } from 'store/client/slice';
import { NewClient, Client, isNewClient } from 'types/client';
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

  const [currentPage, setCurrentPage] = useState(1);
  const currentRowsPerPage = 15;

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

  const editableClient = useSelector(
    (state: RootState) => state.client.editableClient
  );
  const isClientFormShow = useSelector(
    (state: RootState) => state.client.isClientFormShow
  );

  useEffect(() => {
    dispatch(
      fetchClientsThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage]);

  const handlePageChange = (event: never, newPage: number): void => {
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
