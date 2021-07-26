import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Client } from 'types/client';
import { fetchClientsThunk } from 'store/client/thunks';

export const useClientPick = () => {
  const dispatch = useDispatch();

  const [isClientPickerShow, setClientPickerShow] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const currentRowsPerPage = 10;

  const globalClients = useSelector((state: RootState) => state.client.clients);
  const totalClients = useSelector(
    (state: RootState) => state.client.totalClients
  );
  const clientsFetchRequestStatus = useSelector(
    (state: RootState) => state.client.clientsFetchRequestStatus
  );

  const isClientsFetchLoading = clientsFetchRequestStatus === 'loading';

  useEffect(() => {
    dispatch(
      fetchClientsThunk({ page: currentPage, limit: currentRowsPerPage })
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    setClients((clients: Client[]) => [...clients, ...globalClients]);
  }, [globalClients]);

  useEffect(() => {
    if (!isClientPickerShow && currentPage !== 1) {
      setClients([]);
      setCurrentPage(1);
    }
  }, [currentPage, isClientPickerShow]);

  const handlePickClient = (selectedClientId: number) => {
    console.log(selectedClientId);
  };

  const getClientsByQuery = (query: string) => {
    console.log(query);
  };

  const hasNextPage =
    Math.floor(totalClients / currentRowsPerPage) >= currentPage;

  const handleLoadMoreItems = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    isClientPickerShow,
    setClientPickerShow,
    clients,
    isClientsFetchLoading,
    hasNextPage,
    handleLoadMoreItems,
    handlePickClient,
    getClientsByQuery,
  };
};
