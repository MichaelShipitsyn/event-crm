import '@testing-library/jest-dom/extend-expect';

import { screen } from '@testing-library/react';
import { AuthProvider } from 'components/AuthProvider';
import * as React from 'react';
import * as redux from 'react-redux';
import { createStoreTest, renderWithProviders } from 'tests/app-test-utils';

const ui = (
  <AuthProvider>
    <p>children</p>
  </AuthProvider>
);

test('render children when isAuthChecked=true', () => {
  const storeTest = createStoreTest({
    auth: { isAuthChecked: true },
  });

  renderWithProviders(ui, storeTest);

  expect(screen.queryByText('children')).toBeInTheDocument();
});

test('render LoadingScreen when isAuthChecked=false', () => {
  const storeTest = createStoreTest({
    auth: { isAuthChecked: false },
  });

  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  renderWithProviders(ui, storeTest);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
