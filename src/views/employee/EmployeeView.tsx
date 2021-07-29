import { Box, Container } from '@material-ui/core';
import type { FC } from 'react';
import React from 'react';

import { EmployeeTable } from './EmployeeTable';
import { Header } from './Header';
import { StyledPage } from './styled'

export const EmployeeView: FC = () => {
  return (
    <StyledPage title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <EmployeeTable />
        </Box>
      </Container>
    </StyledPage>
  );
};
