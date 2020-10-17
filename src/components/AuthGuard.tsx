import React from 'react';
import type { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';
import { Redirect } from 'react-router-dom';

interface AuthGuardProps {
  children?: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
