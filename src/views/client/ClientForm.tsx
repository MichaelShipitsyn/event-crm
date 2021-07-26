import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  SvgIcon,
  TextField,
  Typography,
} from '@material-ui/core';
import { ButtonWithLoader } from 'components';
import React from 'react';
import { Check as CheckIcon, X as XIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Client, NewClient } from 'types/client';
import * as yup from 'yup';

type FormData = {
  name: string;
  phone: string;
  email: string;
  additional: string;
};

type Props = {
  initialClient: Client | null;
  onSave: (client: Client | NewClient) => void;
  onClose: () => void;
};

const useStyles = makeStyles(() => ({
  toggleButtonGroup: {
    display: 'flex',
    marginTop: '3px',
  },
  toggleButton: {
    width: '50%',
  },
  drawerContent: {
    overflowY: 'auto',
    height: '100%',
  },
}));

const schema = yup.object().shape({
  name: yup.string().required('Обязательное поле'),
  phone: yup.string(),
  email: yup.string().email('Невалидный Email'),
  additional: yup.string(),
});

export const ClientForm = ({ initialClient, onSave, onClose }: Props) => {
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: initialClient ?? undefined,
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const updateClientRequestStatus = useSelector(
    (state: RootState) => state.client.updateClientRequestStatus
  );
  const createClientRequestStatus = useSelector(
    (state: RootState) => state.client.createClientRequestStatus
  );

  const handleSave = (editedClient: FormData) => {
    if (initialClient) return onSave({ ...initialClient, ...editedClient });
    return onSave({ ...editedClient });
  };

  return (
    <Drawer anchor="right" open onClose={onClose} variant="temporary">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="textPrimary">
          {initialClient ? initialClient.name : 'Создание клиента'}
        </Typography>
        <IconButton onClick={onClose}>
          <SvgIcon fontSize="small">
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Box>
      <Divider light variant="fullWidth" />
      <div className={classes.drawerContent}>
        <Box px={3} py={1}>
          <TextField
            error={!!errors?.name}
            helperText={errors?.name && errors?.name.message}
            inputRef={register}
            fullWidth
            label="Имя"
            margin="normal"
            name="name"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.phone}
            helperText={errors?.phone && errors?.phone.message}
            inputRef={register}
            fullWidth
            label="Телефон"
            margin="normal"
            name="phone"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.email}
            helperText={errors?.email && errors?.email.message}
            inputRef={register}
            fullWidth
            label="Электронная почта"
            margin="normal"
            name="email"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.additional}
            helperText={errors?.additional && errors?.additional.message}
            inputRef={register}
            fullWidth
            multiline
            rows={5}
            label="Дополнительно"
            margin="normal"
            name="additional"
            type="text"
            variant="outlined"
          />
        </Box>
      </div>
      <Box p={3} display="flex" justifyContent="space-between">
        <Button variant="contained">Отменить</Button>
        <ButtonWithLoader
          isLoading={
            updateClientRequestStatus === 'loading' ||
            createClientRequestStatus === 'loading'
          }
          label="Сохранить"
          disabled={Object.keys(errors).length !== 0}
          onClick={handleSubmit((editedClient: FormData) =>
            handleSave(editedClient)
          )}
          color="secondary"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <CheckIcon />
            </SvgIcon>
          }
        />
      </Box>
    </Drawer>
  );
};
