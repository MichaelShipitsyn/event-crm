import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { deleteEmployeesThunk } from 'store/employee/thunks';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';

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
    handleDeleteEmployee,
  };
};
