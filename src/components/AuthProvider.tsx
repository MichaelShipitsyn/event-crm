import React, { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthRequest } from 'store/auth/thunks';
import { RootState } from 'store/rootReducer';
import { LoadingScreen } from './LoadingScreen';
import { Redirect } from 'react-router-dom';

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const isInitialised = useSelector(
    (state: RootState) => state.auth.isInitialised
  );
  const isLoading = useSelector((state: RootState) => state.global.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isInitialised) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};
