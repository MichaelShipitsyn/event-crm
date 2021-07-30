import { Box, Card, Divider, Link, Typography } from '@material-ui/core';
import { Logo } from 'components';
import type { FC } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { RegisterForm } from './RegisterForm';
import { StyledCardContainer, StyledCardContent, StyledPage } from './styled';

export const RegisterView: FC = () => {
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
                  Регистрация
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={1}>
              <RegisterForm />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              color="textSecondary"
            >
              У меня уже есть аккаунт
            </Link>
          </StyledCardContent>
        </Card>
      </StyledCardContainer>
    </StyledPage>
  );
};
