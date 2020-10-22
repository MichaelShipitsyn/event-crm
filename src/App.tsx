import React from 'react';
import type { FC } from 'react';
import { Router } from 'react-router-dom';
import { history } from 'libs/history';
import { create } from 'jss';
import MomentUtils from '@date-io/moment';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { GlobalStyles } from 'components/GlobalStyles';
import { ScrollReset } from 'components/ScrollReset';
import { AuthProvider } from 'components/AuthProvider';
import { createTheme } from 'theme';
import routes, { renderRoutes } from 'routes';

const jss = create({ plugins: [...jssPreset().plugins] });

const App: FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthProvider>
            <Router history={history}>
              <GlobalStyles />
              <ScrollReset />
              {renderRoutes(routes)}
            </Router>
          </AuthProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
