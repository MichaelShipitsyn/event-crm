import React from 'react';
import type { FC } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { jssPreset, StylesProvider, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { GlobalStyles } from 'components/GlobalStyles';
import { ScrollReset } from 'components/ScrollReset';
import { createTheme } from 'theme';
import routes, { renderRoutes } from 'routes';

const jss = create({ plugins: [...jssPreset().plugins] });
const history = createBrowserHistory();

const App: FC = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider dense maxSnack={3}>
            <Router history={history}>
              <GlobalStyles />
              <ScrollReset />
              {renderRoutes(routes)}
            </Router>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
