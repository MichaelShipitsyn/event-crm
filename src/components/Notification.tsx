import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { closeAlert } from 'store/global/slice';

export const Notification = () => {
  const dispatch = useDispatch();
  const alertMessage = useSelector(
    (state: RootState) => state.global.alertMessage
  );
  const alertType = useSelector((state: RootState) => state.global.alertType);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    if (alertMessage) {
      dispatch(closeAlert());
    }
  };

  return (
    <Snackbar
      open={!!alertMessage}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
