import React from 'react';
import type { FC } from 'react';
import {
  Button,
  Drawer,
  Grid,
  Hidden,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Trash as TrashIcon } from 'react-feather';
import type { Theme } from 'theme';

interface BulkOperationsProps {
  onDelete: () => void;
  open: boolean;
  selected: number[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

export const TableSelectedBar: FC<BulkOperationsProps> = ({
  onDelete,
  open,
  selected
}) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="bottom"
      open={open}
      PaperProps={{ elevation: 1 }}
      variant="persistent"
    >
      <div className={classes.root}>
        <Grid alignItems="center" container spacing={2}>
          <Hidden smDown>
            <Grid item md={3}>
              <Typography color="textSecondary" variant="subtitle1">
                Кол-во выбранных: {selected.length}
              </Typography>
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12}>
            <div className={classes.actions}>
              <Button
                onClick={onDelete}
                startIcon={
                  <SvgIcon fontSize="small">
                    <TrashIcon />
                  </SvgIcon>
                }
              >
                Отправить в архив
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};
