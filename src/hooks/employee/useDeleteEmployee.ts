import { useEffect, useState } from 'react';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { deleteEmployeesThunk } from 'store/employee/thunks';

export const useDeleteEmployee = () => {
  const dispatch = useDispatch();

  const [removableEmployeeID, setRemovableEmployeeID] = useState<number | null>(
    null
  );
  const deleteEmployeeRequestStatus = useSelector(
    (state: RootState) => state.employee.deleteEmployeeRequestStatus
  );

  useEffect(() => {
    if (isRequestFulfilled(deleteEmployeeRequestStatus)) {
      setRemovableEmployeeID(null);
    }
  }, [deleteEmployeeRequestStatus]);

  const handleDeleteEmployee = () => {
    if (removableEmployeeID) {
      dispatch(deleteEmployeesThunk(removableEmployeeID));
    }
  };

  return {
    removableEmployeeID,
    setRemovableEmployeeID,
    deleteEmployeeRequestStatus,
    handleDeleteEmployee
  };
};
