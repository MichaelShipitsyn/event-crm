import { Box, Container } from '@material-ui/core';
import type { FC } from 'react';
import React from 'react';

import { ClientTable } from './ClientTable';
import { Header } from './Header';
import { StyledPage } from './styled';

export const ClientView: FC = () => {
  return (
    <StyledPage title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <ClientTable />
        </Box>
      </Container>
    </StyledPage>
  );
};
