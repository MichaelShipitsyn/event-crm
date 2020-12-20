import * as React from 'react';
import * as redux from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import { renderWithProviders, createStoreTest } from 'tests/app-test-utils';
import { AuthProvider } from 'components/AuthProvider';

const ui = (
  <AuthProvider>
    <p>children</p>
  </AuthProvider>
);

test('render children when isAuthChecked=true', async () => {
  const storeTest = createStoreTest({
    auth: { isAuthChecked: true }
  });

  renderWithProviders(ui, storeTest);

  expect(screen.queryByText('children')).toBeInTheDocument();
});

test('render LoadingScreen when isAuthChecked=false', async () => {
  const storeTest = createStoreTest({
    auth: { isAuthChecked: false }
  });

  const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);

  renderWithProviders(ui, storeTest);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
