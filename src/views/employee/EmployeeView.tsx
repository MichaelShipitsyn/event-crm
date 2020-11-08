import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'theme';
import { Page } from 'components/Page';
import { User } from 'types/users';
import { request } from 'libs/request';
import { Header } from './Header';
import { Results } from './Results';


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
  const [employees, setEmployees] = useState<User[]>([]);

  const getEmployees = async () => {
    try {
      const response = await request.get<{ employees: User[] }>('/employees');
      setEmployees(response.data.employees);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Page className={classes.root} title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results employees={employees} />
        </Box>
      </Container>
    </Page>
  );
};
