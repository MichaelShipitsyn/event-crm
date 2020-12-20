import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithProviders, createStoreTest } from 'tests/app-test-utils';
import { AuthGuard } from 'components/AuthGuard';

const ui = (
  <AuthGuard>
    <p>children</p>
  </AuthGuard>
);

test('check guard when user not auth', async () => {
  const storeTest = createStoreTest({ auth: { isAuthenticated: false } });

  renderWithProviders(ui, storeTest);

  expect(screen.queryByText('children')).not.toBeInTheDocument();
});

test('check guard when user auth', async () => {
  const storeTest = createStoreTest({ auth: { isAuthenticated: true } });

  renderWithProviders(ui, storeTest);

  expect(screen.queryByText('children')).toBeInTheDocument();
});
