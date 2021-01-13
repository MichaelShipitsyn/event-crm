import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Order, NewOrder, isNewOrder } from 'types/order';
import { NewClient } from 'types/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderFormShow } from 'store/order/slice';
import * as yup from 'yup';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  Divider,
  makeStyles,
  Grid,
  useMediaQuery,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Check as CheckIcon, X as XIcon } from 'react-feather';
import { ButtonWithLoader } from 'components';

import { RootState } from 'store';
import { createOrderThunk, updateOrderThunk } from '../../store/order/thunks';

type FormData = NewOrder & {
  newClient: NewClient | null;
};

type Props = {
  initialOrder: Order | null;
};

const useStyles = makeStyles(() => ({
  toggleButtonGroup: {
    display: 'flex',
    marginTop: '3px'
  },
  toggleButton: {
    width: '50%'
  },
  drawerContent: {
    overflowY: 'auto',
    height: '100%'
  }
}));

const schema = yup.object().shape({
  newClient: yup
    .object()
    .shape({
      name: yup.string().required('Обязательное поле')
    })
    .nullable(),
  name: yup.string().required('Обязательное поле'),
  phone: yup.string(),
  email: yup.string().email('Невалидный Email'),
  additional: yup.string()
});

export const OrderForm: FC<Props> = ({ initialOrder }) => {
  const dispatch = useDispatch();

  const [isNewClient, setNewClient] = useState(initialOrder === null);

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, errors, watch, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: initialOrder
      ? { ...initialOrder, newClient: { name: '', phone: '' } }
      : undefined,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    register('newClient');
  }, [register]);

  useEffect(() => {
    if (isNewClient) {
      setValue('newClient', { name: '', phone: '' });
    } else {
      setValue('newClient', null);
    }
  }, [isNewClient]);

  const updateOrderRequestStatus = useSelector(
    (state: RootState) => state.order.updateOrderRequestStatus
  );
  const createOrderRequestStatus = useSelector(
    (state: RootState) => state.order.createOrderRequestStatus
  );

  const handleClose = () => {
    dispatch(setOrderFormShow(false));
  };

  const handleSave = (editedOrder: FormData) => {
    console.log(editedOrder);
    if (initialOrder) {
      dispatch(updateOrderThunk({ ...initialOrder, ...editedOrder }));
    } else {
      dispatch(createOrderThunk({ ...editedOrder }));
    }
  };

  return (
    <Drawer anchor="right" open onClose={handleClose} variant="temporary">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="textPrimary">
          {initialOrder ? initialOrder.name : 'Создание заказа'}
        </Typography>
        <IconButton onClick={handleClose}>
          <SvgIcon fontSize="small">
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Box>
      <Divider light variant="fullWidth" />
      <div className={classes.drawerContent}>
        <Box px={3} py={1}>
          <pre style={{ marginTop: 24 }}>
            {JSON.stringify(watch(), null, 2)}
          </pre>
          <FormControlLabel
            control={
              <Checkbox
                checked={isNewClient}
                onChange={(event) => setNewClient(event.target.checked)}
                name="checkedA"
              />
            }
            label="Secondary"
          />
          {isNewClient && (
            <>
              <TextField
                error={!!errors?.newClient?.name}
                helperText={
                  errors?.newClient?.name && errors?.newClient?.name.message
                }
                inputRef={register}
                fullWidth
                label="Имя клиента"
                margin="normal"
                name="newClient.name"
                type="text"
                variant="outlined"
              />
              <TextField
                error={!!errors?.newClient?.phone}
                helperText={
                  errors?.newClient?.phone && errors?.newClient?.phone.message
                }
                inputRef={register}
                fullWidth
                label="Телефон"
                margin="normal"
                name="newClient.phone"
                type="text"
                variant="outlined"
              />
            </>
          )}

          <TextField
            error={!!errors?.name}
            helperText={errors?.name && errors?.name.message}
            inputRef={register}
            fullWidth
            label="Название заказа"
            margin="normal"
            name="name"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.address}
            helperText={errors?.address && errors?.address.message}
            inputRef={register}
            fullWidth
            label="Адрес"
            margin="normal"
            name="address"
            type="text"
            variant="outlined"
          />
          <Grid container spacing={isMobile ? 0 : 3}>
            <Grid item sm={6} xs={12}>
              <TextField
                error={!!errors?.cost}
                helperText={errors?.cost && errors?.cost.message}
                inputRef={register}
                fullWidth
                label="Стоимость"
                margin="normal"
                name="cost"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                error={!!errors?.prepay}
                helperText={errors?.prepay && errors?.prepay.message}
                inputRef={register}
                fullWidth
                label="Предоплата"
                margin="normal"
                name="prepay"
                type="text"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <TextField
            error={!!errors?.description}
            helperText={errors?.description && errors?.description.message}
            inputRef={register}
            fullWidth
            multiline={true}
            rows={5}
            label="Описание"
            margin="normal"
            name="description"
            type="text"
            variant="outlined"
          />
        </Box>
      </div>
      <Box p={3} display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handleClose}>
          Отменить
        </Button>
        <ButtonWithLoader
          isLoading={
            updateOrderRequestStatus === 'loading' ||
            createOrderRequestStatus === 'loading'
          }
          label="Сохранить"
          disabled={Object.keys(errors).length !== 0}
          onClick={handleSubmit((editedOrder: FormData) =>
            handleSave(editedOrder)
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
