import {
  Button,
  Drawer,
  Grid,
  Hidden,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import type { FC } from 'react';
import React from 'react';
import { Trash as TrashIcon } from 'react-feather';
import styled from 'styled-components';

const StyledDrawerContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledActions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > * + *': {
    marginLeft: theme.spacing(2),
  },
}));

interface BulkOperationsProps {
  onDelete: () => void;
  open: boolean;
  selected: number[];
}

export const TableSelectedBar: FC<BulkOperationsProps> = ({
  onDelete,
  open,
  selected,
}) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      PaperProps={{ elevation: 1 }}
      variant="persistent"
    >
      <StyledDrawerContent>
        <Grid alignItems="center" container spacing={2}>
          <Hidden smDown>
            <Grid item md={3}>
              <Typography color="textSecondary" variant="subtitle1">
                Кол-во выбранных: {selected.length}
              </Typography>
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12}>
            <StyledActions>
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
            </StyledActions>
          </Grid>
        </Grid>
      </StyledDrawerContent>
    </Drawer>
  );
};
