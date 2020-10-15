import React, { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthRequest } from 'store/auth/thunks';
import { RootState } from 'store/rootReducer';
import { LoadingScreen } from './LoadingScreen';
import { Redirect } from 'react-router-dom';

interface GuestGuardProps {
  children?: ReactNode;
}

export const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isLoading = useSelector((state: RootState) => state.global.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Redirect to="/app/employee" />;
  }

  return <>{children}</>;
};
