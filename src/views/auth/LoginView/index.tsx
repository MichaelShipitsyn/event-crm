import { Box, Card, Divider, Link, Typography } from '@material-ui/core';
import { Logo } from 'components/Logo';
import type { FC } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { LoginForm } from './LoginForm';
import { StyledCardContainer, StyledCardContent, StyledPage } from './styled';

export const LoginView: FC = () => {
  return (
    <StyledPage title="Login">
      <StyledCardContainer maxWidth="sm">
        <Box mb={8} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <StyledCardContent>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Вход
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={1}>
              <LoginForm />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Зарегистрироваться
            </Link>
          </StyledCardContent>
        </Card>
      </StyledCardContainer>
    </StyledPage>
  );
};
