import type { ReactNode } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from 'store';

type Props = {
  children?: ReactNode;
};

export const GuestGuard = ({ children }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to="/app/employees" />;
  }

  return <>{children}</>;
};
