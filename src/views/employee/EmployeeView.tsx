import React, { useEffect } from 'react';
import type { FC } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'theme';
import { Page } from 'components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from 'store/employee/thunks';
import { RootState } from 'store';
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

  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

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
