import React from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import type { Theme } from 'theme';
import { Page } from 'components/Page';
import { Logo } from 'components/Logo';
import { RegisterForm } from './RegisterForm';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },
    cardContainer: {
      paddingBottom: 80,
      paddingTop: 80
    },
    cardContent: {
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      minHeight: 400
    }
  };
});

export const RegisterView: FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Login">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={8} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
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
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              У меня уже есть аккаунт
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};
