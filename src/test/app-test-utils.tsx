import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store, AnyAction } from 'redux';

export const renderWithStoreAndRouter = (
  ui: React.ReactElement,
  store: Store<any, AnyAction>,
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
