import React from 'react';
import type { FC } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'theme';
import { Page } from 'components/Page';
import type { Employee } from 'types/employee';
import { Header } from './Header';
import { Results } from './Results';
import moment from 'moment';

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

  const customers: Employee[] = [
    {
      id: '5e887ac47eed253091be10cb',
      avatar: '/static/images/avatars/avatar_3.png',
      city: 'Cleveland',
      country: 'USA',
      currency: '$',
      email: 'cao.yu@devias.io',
      hasAcceptedMarketing: true,
      isProspect: false,
      isReturning: true,
      name: 'Cao Yu',
      state: 'Ohio',
      totalAmountSpent: 300.0,
      totalOrders: 3,
      updatedAt: moment()
        .subtract(1, 'days')
        .subtract(7, 'hours')
        .toDate()
        .getTime()
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      avatar: '/static/images/avatars/avatar_4.png',
      city: 'Atlanta',
      country: 'USA',
      currency: '$',
      email: 'alex.richardson@devias.io',
      hasAcceptedMarketing: true,
      isProspect: true,
      isReturning: false,
      name: 'Alex Richardson',
      state: 'Georgia',
      totalAmountSpent: 0.0,
      totalOrders: 0,
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime()
    }
  ];

  return (
    <Page className={classes.root} title="Сотрудники">
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};
