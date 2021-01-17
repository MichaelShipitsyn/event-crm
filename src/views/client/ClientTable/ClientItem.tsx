import React from 'react';
import type { FC } from 'react';
import { RootState } from 'store';
import { SkeletonWrap } from 'components';
import { Client } from 'types/client';
import {
  Box,
  IconButton,
  SvgIcon,
  TableCell,
  TableRow,
  makeStyles
} from '@material-ui/core';
import { User as UserIcon, Trash2 as TrashIcon } from 'react-feather';
import { useSelector } from 'react-redux';

type Props = {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
};

const useStyles = makeStyles(() => ({
  stickyTableCell: {
    position: 'sticky',
    right: 0,
    background: '#fff'
  },
  iconButton: {
    border: '1px solid rgba(84, 110, 122, 0.3)',
    padding: '5px',
    '&:hover': {
      backgroundColor: 'rgba(84, 110, 122, 0.15)'
    }
  }
}));

export const ClientItem: FC<Props> = ({ client, onEdit, onDelete }) => {
  const classes = useStyles();

  const clientsFetchRequestStatus = useSelector(
    (state: RootState) => state.client.clientsFetchRequestStatus
  );

  const isClientsFetchLoading = clientsFetchRequestStatus === 'loading';

  return (
    <TableRow key={client.id}>
      <TableCell>
        <SkeletonWrap isLoading={isClientsFetchLoading}>
          {client.name}
        </SkeletonWrap>
      </TableCell>
      <TableCell>
        <SkeletonWrap isLoading={isClientsFetchLoading}>
          {client.phone}
        </SkeletonWrap>
      </TableCell>
      <TableCell>
        <SkeletonWrap isLoading={isClientsFetchLoading}>
          {client.email}
        </SkeletonWrap>
      </TableCell>
      <TableCell align="right" className={classes.stickyTableCell}>
        <SkeletonWrap isLoading={isClientsFetchLoading}>
          <Box mr="5px" clone>
            <IconButton
              classes={{ root: classes.iconButton }}
              onClick={() => onEdit()}
            >
              <SvgIcon fontSize="small">
                <UserIcon />
              </SvgIcon>
            </IconButton>
          </Box>
          <IconButton
            classes={{ root: classes.iconButton }}
            onClick={() => onDelete()}
          >
            <SvgIcon fontSize="small">
              <TrashIcon />
            </SvgIcon>
          </IconButton>
        </SkeletonWrap>
      </TableCell>
    </TableRow>
  );
};
