import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import store from 'store';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from 'store/rootReducer';
import { AuthGuard } from './AuthGuard';

test('check redirection works', async () => {
  let initialState = store.getState();
  initialState = {
    ...initialState,
    auth: { ...initialState.auth, isAuthenticated: false }
  };

  const storeTest = createStore(rootReducer, initialState);

  render(
    <Provider store={storeTest}>
      <MemoryRouter>
        <AuthGuard>
          <p>children</p>
        </AuthGuard>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.queryByText('children')).not.toBeInTheDocument();
});

test('check redirection works', async () => {
  let initialState = store.getState();
  initialState = {
    ...initialState,
    auth: { ...initialState.auth, isAuthenticated: true }
  };

  const storeTest = createStore(rootReducer, initialState);

  render(
    <Provider store={storeTest}>
      <MemoryRouter>
        <AuthGuard>
          <p>children</p>
        </AuthGuard>
      </MemoryRouter>
    </Provider>
  );
  expect(screen.queryByText('children')).toBeInTheDocument();
});
