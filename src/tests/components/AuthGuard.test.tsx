import '@testing-library/jest-dom/extend-expect';

import { screen } from '@testing-library/react';
import { AuthGuard } from 'components/AuthGuard';
import * as React from 'react';
import { createStoreTest, renderWithProviders } from 'tests/app-test-utils';

const ui = (
  <AuthGuard>
    <p>children</p>
  </AuthGuard>
);

test('check guard when user not auth', () => {
  const storeTest = createStoreTest({ auth: { isAuthenticated: false } });

  renderWithProviders(ui, storeTest);

  expect(screen.queryByText('children')).not.toBeInTheDocument();
});

test('check guard when user auth', () => {
  const storeTest = createStoreTest({ auth: { isAuthenticated: true } });

  renderWithProviders(ui, storeTest);

  expect(screen.queryByText('children')).toBeInTheDocument();
});
