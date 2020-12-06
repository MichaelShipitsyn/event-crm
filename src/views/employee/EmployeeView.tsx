import React from 'react';
import type { FC } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'theme';
import { Page } from 'components/Page';
import { Header } from './Header';
import { EmployeeTable } from './EmployeeTable';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

export const EmployeeView: FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <EmployeeTable />
        </Box>
      </Container>
    </Page>
  );
};
