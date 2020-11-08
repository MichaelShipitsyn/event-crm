import React from 'react';
import type { FC } from 'react';
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import {
  PlusCircle as PlusCircleIcon
} from 'react-feather';

export const Header: FC = () => {
  return (
    <Grid
      container
      justify="space-between"
      spacing={3}
    >
      <Grid item>
        <Typography variant="h3" color="textPrimary">
          Сотрудники
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          )}
        >
          Добавить сотрудника
        </Button>
      </Grid>
    </Grid>
  );
};
