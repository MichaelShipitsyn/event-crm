import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store } from 'redux';
import rootReducer from 'store/rootReducer';

export const renderWithProviders = (
  ui: React.ReactElement,
  store: Store,
  { ...renderOptions } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
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
