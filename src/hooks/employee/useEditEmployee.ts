import { useEffect, useState } from 'react';
import { User } from 'types/users';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';

export const useEditEmployee = () => {
  const dispatch = useDispatch();

  const [editableEmployee, setEditableEmployee] = useState<User | null>(null);

  const handleEmployeeSave = async (employee: User) => {
    console.log(employee);
  };

  return {
    editableEmployee,
    setEditableEmployee,
    handleEmployeeSave
  };
};
