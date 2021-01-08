import { useEffect, useState } from 'react';
import { User } from 'types/users';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { updateEmployeesThunk } from 'store/employee/thunks';
import { isRequestFulfilled } from 'utils/isRequestFulfilled';

export const useEditEmployee = () => {
  const dispatch = useDispatch();

  const [editableEmployee, setEditableEmployee] = useState<User | null>(null);
  const updateEmployeeRequestStatus = useSelector(
    (state: RootState) => state.employee.updateEmployeeRequestStatus
  );

  useEffect(() => {
    if (isRequestFulfilled(updateEmployeeRequestStatus)) {
      setEditableEmployee(null);
    }
  }, [updateEmployeeRequestStatus]);

  const handleEmployeeSave = async (employee: User) => {
    dispatch(updateEmployeesThunk(employee));
  };

  return {
    editableEmployee,
    setEditableEmployee,
    handleEmployeeSave
  };
};
