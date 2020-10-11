import React, { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthRequest } from 'store/auth/thunks';
import { RootState } from 'store/rootReducer';
import { LoadingScreen } from './LoadingScreen';

interface AuthGuardProps {
  children?: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthRequest());
    }
  });

  if (!isAuthenticated) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
