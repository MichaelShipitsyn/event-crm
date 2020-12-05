import React from 'react';
import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Redirect } from 'react-router-dom';

interface GuestGuardProps {
  children?: ReactNode;
}

export const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to="/app/employees" />;
  }

  return <>{children}</>;
};
