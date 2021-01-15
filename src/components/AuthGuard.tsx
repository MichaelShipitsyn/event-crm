import React from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Redirect } from 'react-router-dom';

export const AuthGuard: FC = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};
