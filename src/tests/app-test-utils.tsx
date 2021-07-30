import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store } from 'redux';
import { rootReducer } from 'store/rootReducer';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from 'theme';

export const renderWithProviders = (
  ui: React.ReactElement,
  store: Store,
  { ...renderOptions } = {}
) => {
  const theme = createTheme();

  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <MemoryRouter>{children}</MemoryRouter>
          </StylesProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
};

export const createStoreTest = (state: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });
};
