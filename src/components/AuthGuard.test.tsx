import * as React from 'react';
import { createStore } from 'redux';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import store from 'store';
import rootReducer from 'store/rootReducer';
import { renderWithStoreAndRouter } from 'test/app-test-utils';
import { AuthGuard } from './AuthGuard';

const initialState = store.getState();

const ui = (
  <AuthGuard>
    <p>children</p>
  </AuthGuard>
);

test('check guard when user not auth', async () => {
  const storeTest = createStore(rootReducer, {
    ...initialState,
    auth: { ...initialState.auth, isAuthenticated: false }
  });

  renderWithStoreAndRouter(ui, storeTest);
  expect(screen.queryByText('children')).not.toBeInTheDocument();
});

test('check guard when user auth', async () => {
  const storeTest = createStore(rootReducer, {
    ...initialState,
    auth: { ...initialState.auth, isAuthenticated: true }
  });

  renderWithStoreAndRouter(ui, storeTest);
  expect(screen.queryByText('children')).toBeInTheDocument();
});
