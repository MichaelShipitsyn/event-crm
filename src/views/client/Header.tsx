import React from 'react';
import type { FC } from 'react';
import { Button, Grid, SvgIcon, Typography } from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { setClientFormShow } from 'store/client/slice';
import { useDispatch } from 'react-redux';

export const Header: FC = () => {
  const dispatch = useDispatch();
  return (
    <Grid container alignItems="center" justify="space-between" spacing={3}>
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Клиенты
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => dispatch(setClientFormShow(true))}
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
