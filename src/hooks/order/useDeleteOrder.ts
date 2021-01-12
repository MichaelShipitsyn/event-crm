import { useEffect, useState } from 'react';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { deleteOrderThunk } from 'store/order/thunks';

export const useDeleteOrder = () => {
  const dispatch = useDispatch();

  const [removableOrderID, setRemovableOrderID] = useState<number | null>(null);
  const deleteOrderRequestStatus = useSelector(
    (state: RootState) => state.order.deleteOrderRequestStatus
  );

  useEffect(() => {
    if (isRequestFulfilled(deleteOrderRequestStatus)) {
      setRemovableOrderID(null);
    }
  }, [deleteOrderRequestStatus]);

  const handleDeleteOrder = () => {
    if (removableOrderID) {
      dispatch(deleteOrderThunk(removableOrderID));
    }
  };

  return {
    removableOrderID,
    setRemovableOrderID,
    deleteOrderRequestStatus,
    handleDeleteOrder
  };
};
