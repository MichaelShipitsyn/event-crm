import React, { useEffect } from 'react';
import type { FC } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setServerError } from 'store/global/slice';

export const Notification: FC = () => {
  const dispatch = useDispatch();
  const isServerError = useSelector(
    (state: RootState) => state.global.isServerError
  );

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    console.log('close');
    if (reason === 'clickaway') {
      return;
    }

    if (isServerError) {
      dispatch(setServerError(false));
    }
  };

  return (
    <Snackbar
      open={isServerError}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error">
        Ошибка сервера. Обратитесь к администрации.
      </Alert>
    </Snackbar>
  );
};
