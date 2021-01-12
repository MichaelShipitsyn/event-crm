import React from 'react';
import type { FC } from 'react';
import { Button, Grid, SvgIcon, Typography } from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { setOrderFormShow } from 'store/order/slice';
import { useDispatch } from 'react-redux';

export const Header: FC = () => {
  const dispatch = useDispatch();
  return (
    <Grid container justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Заказы
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => dispatch(setOrderFormShow(true))}
          color="secondary"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          Добавить клиента
        </Button>
      </Grid>
    </Grid>
  );
};
