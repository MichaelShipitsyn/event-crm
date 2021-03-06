import React, { useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthRequest } from 'store/auth/thunks';
import { RootState } from 'store';
import { LoadingScreen } from 'components/LoadingScreen';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh'
  }
}));

export const AuthProvider: FC = ({ children }) => {
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
