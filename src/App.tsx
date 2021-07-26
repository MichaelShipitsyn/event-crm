import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import {
  AuthProvider,
  GlobalStyles,
  Notification,
  ScrollReset,
} from 'components';
import { create } from 'jss';
import { history } from 'libs/history';
import type { FC } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import routes, { renderRoutes } from 'routes';
import store from 'store';
import { createTheme } from 'theme';

const jss = create({ plugins: [...jssPreset().plugins] });

export const App: FC = () => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <AuthProvider>
            <Router history={history}>
              <GlobalStyles />
              <ScrollReset />
              <Notification />
              {renderRoutes(routes)}
            </Router>
          </AuthProvider>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
};
