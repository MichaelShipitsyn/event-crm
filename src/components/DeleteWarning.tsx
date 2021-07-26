import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';

import { ButtonWithLoader } from './ButtonWithLoader';

type Props = {
  isLoading: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export const DeleteWarning = ({ isLoading, onCancel, onDelete }: Props) => {
  return (
    <Dialog
      open
      onClose={onCancel}
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
        <Button className="actionButton" variant="outlined" onClick={onCancel}>
          Отменить
        </Button>
        <ButtonWithLoader
          isLoading={isLoading}
          label="Отправить в архив"
          className="deleteButton actionButton"
          onClick={onDelete}
          color="primary"
          autoFocus
        />
      </DialogActions>
    </Dialog>
  );
};
