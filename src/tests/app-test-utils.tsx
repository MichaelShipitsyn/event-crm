import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
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
      ...renderOptions
    })
  };
};

export const createStoreTest = (state: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state
  });
};
