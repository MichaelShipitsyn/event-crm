import { Box, Container } from '@material-ui/core';
import React from 'react';

import { Header } from './Header';
import { OrderTable } from './OrderTable';
import { StyledPage } from './styled'

export const OrderView = () => {
  return (
    <StyledPage title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <OrderTable />
        </Box>
      </Container>
    </StyledPage>
  );
};
