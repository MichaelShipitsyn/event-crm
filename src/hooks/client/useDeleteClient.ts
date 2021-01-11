import { useEffect, useState } from 'react';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { deleteClientThunk } from 'store/client/thunks';

export const useDeleteClient = () => {
  const dispatch = useDispatch();

  const [removableClientID, setRemovableClientID] = useState<number | null>(
    null
  );
  const deleteClientRequestStatus = useSelector(
    (state: RootState) => state.client.deleteClientRequestStatus
  );

  useEffect(() => {
    if (isRequestFulfilled(deleteClientRequestStatus)) {
      setRemovableClientID(null);
    }
  }, [deleteClientRequestStatus]);

  const handleDeleteClient = () => {
    if (removableClientID) {
      dispatch(deleteClientThunk(removableClientID));
    }
  };

  return {
    removableClientID,
    setRemovableClientID,
    deleteClientRequestStatus,
    handleDeleteClient
  };
};
