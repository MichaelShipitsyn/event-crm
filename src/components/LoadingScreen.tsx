import { Box, LinearProgress } from '@material-ui/core';
import React from 'react';
import styled from "styled-components";

const StyledContainer = styled('div')(
  ({ theme }) => (
    {
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      minHeight: '100%',
      padding: theme.spacing(3),
    }
  )
);

export const LoadingScreen = () => {
  return (
    <StyledContainer>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </StyledContainer>
  );
};
