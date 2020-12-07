import React from 'react';
import type { FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  DialogTitle,
  Button,
  Typography
} from '@material-ui/core';

type AuthProviderProps = {
  deleteWarningOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteWarning: FC<AuthProviderProps> = ({
  deleteWarningOpen,
  onCancel,
  onDelete
}) => {
  return (
    <Dialog
      open={deleteWarningOpen}
      onClose={() => onCancel()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle disableTypography id="alert-dialog-title">
        <Typography variant="h4">Отправить в архив</Typography>
      </DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Typography variant="body2" color="textSecondary">
          Записи, занесённые в архив невозможно восстановить.
        </Typography>
        <Box mt={1} mb={1}>
          <Typography variant="body2" color="textSecondary">
            Вы действительно хотите продолжить?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className="actionButton"
          variant="outlined"
          onClick={() => onCancel()}
        >
          Отменить
        </Button>
        <Button
          className="deleteButton actionButton"
          onClick={() => onDelete()}
          color="primary"
          autoFocus
        >
          Отправить в архив
        </Button>
      </DialogActions>
    </Dialog>
  );
};
