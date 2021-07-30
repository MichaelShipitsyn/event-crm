import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import {
  AuthProvider,
  GlobalStyles,
  Notification,
  ScrollReset,
} from 'components';
import { history } from 'libs/history';
import type { FC } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes, routes } from 'routes';
import { store } from 'store';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from 'theme';

export const App: FC = () => {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <AuthProvider>
              <Router history={history}>
                <GlobalStyles />
                <ScrollReset />
                <Notification />
                {renderRoutes(routes)}
              </Router>
            </AuthProvider>
          </StylesProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
};
