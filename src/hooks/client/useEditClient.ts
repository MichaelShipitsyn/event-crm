import { useEffect, useState } from 'react';
import { Client } from 'types/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { updateClientThunk } from 'store/client/thunks';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';

export const useEditClient = () => {
  const dispatch = useDispatch();

  const [editableClient, setEditableClient] = useState<Client | null>(null);
  const updateClientRequestStatus = useSelector(
    (state: RootState) => state.client.updateClientRequestStatus
  );

  useEffect(() => {
    if (isRequestFulfilled(updateClientRequestStatus)) {
      setEditableClient(null);
    }
  }, [updateClientRequestStatus]);

  const handleClientSave = async (client: Client) => {
    dispatch(updateClientThunk(client));
  };

  return {
    editableClient,
    setEditableClient,
    handleClientSave
  };
};
