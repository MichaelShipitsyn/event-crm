import { RootState } from 'store';

export const getUserFullName = (state: RootState) => {
  return `${state.auth.user?.firstname} ${state.auth.user?.lastname}`;
};
