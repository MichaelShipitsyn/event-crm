import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import NotFoundImage from 'images/not-found.svg';
import type { FC } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { StyledNotFoundImage,StyledPage } from './styled'

export const NotFoundView: FC = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledPage title="404: Not found">
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant={mobileDevice ? 'h4' : 'h1'}
          color="textPrimary"
        >
          404: Страница не найдена
        </Typography>
        <Box mt={6} display="flex" justifyContent="center">
          <StyledNotFoundImage
            alt="Under development"
            src={NotFoundImage}
          />
        </Box>
        <Box mt={6} display="flex" justifyContent="center">
          <Button
            color="secondary"
            component={RouterLink}
            to="/"
            variant="outlined"
          >
            Вернуться на главную
          </Button>
        </Box>
      </Container>
    </StyledPage>
  );
};
