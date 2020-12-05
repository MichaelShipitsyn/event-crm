import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/users';

type InitialState = {
  employees: User[];
};

const initialState: InitialState = {
  employees: []
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees(state, { payload }: PayloadAction<User[]>) {
      state.employees = payload;
    }
  }
});

export const {
  setEmployees
} = employeeSlice.actions;

export const employeeSliceReducer = employeeSlice.reducer;
