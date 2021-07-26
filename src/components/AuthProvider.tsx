import { makeStyles } from '@material-ui/core';
import { LoadingScreen } from 'components/LoadingScreen';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { checkAuthRequest } from 'store/auth/thunks';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
}));

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const classes = useStyles();

  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthRequest());
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className={classes.root}>
        <LoadingScreen />
      </div>
    );
  }

  return <>{children}</>;
};
