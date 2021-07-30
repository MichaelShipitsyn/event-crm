import { LoadingScreen } from 'components/LoadingScreen';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { checkAuthRequest } from 'store/auth/thunks';
import styled from 'styled-components';

export const Container = styled('div')({
  height: '100vh',
});

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <Container>
        <LoadingScreen />
      </Container>
    );
  }

  return <>{children}</>;
};
