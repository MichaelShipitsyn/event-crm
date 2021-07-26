import { Box, Container, makeStyles } from '@material-ui/core';
import { Page } from 'components/Page';
import type { FC } from 'react';
import React from 'react';
import type { Theme } from 'theme';

import { ClientTable } from './ClientTable';
import { Header } from './Header';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export const ClientView: FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <ClientTable />
        </Box>
      </Container>
    </Page>
  );
};
