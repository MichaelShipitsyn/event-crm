import React, { useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthRequest } from 'store/auth/thunks';
import { RootState } from 'store/rootReducer';
import { LoadingScreen } from './LoadingScreen';

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
