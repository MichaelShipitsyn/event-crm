import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { deleteClientThunk } from 'store/client/thunks';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';

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
    handleDeleteClient,
  };
};
