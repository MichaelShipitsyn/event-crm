import { Box, SvgIcon, TableCell, TableRow } from '@material-ui/core';
import { SkeletonWrap } from 'components';
import type { FC } from 'react';
import React from 'react';
import { Trash2 as TrashIcon, User as UserIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Client } from 'types/client';

import { StickyTableCell, StyledIconButton } from './styled';

type Props = {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
};

export const ClientItem: FC<Props> = ({ client, onEdit, onDelete }) => {
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
      <StickyTableCell align="right">
        <SkeletonWrap isLoading={isClientsFetchLoading}>
          <Box mr="5px" clone>
            <StyledIconButton onClick={() => onEdit()}>
              <SvgIcon fontSize="small">
                <UserIcon />
              </SvgIcon>
            </StyledIconButton>
          </Box>
          <StyledIconButton onClick={() => onDelete()}>
            <SvgIcon fontSize="small">
              <TrashIcon />
            </SvgIcon>
          </StyledIconButton>
        </SkeletonWrap>
      </StickyTableCell>
    </TableRow>
  );
};
