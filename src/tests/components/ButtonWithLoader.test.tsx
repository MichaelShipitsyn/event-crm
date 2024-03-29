import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import { ButtonWithLoader } from 'components/ButtonWithLoader';
import * as React from 'react';

test('check render with isLoading=false', () => {
  render(<ButtonWithLoader label="test-label" isLoading={false} />);

  expect(
    screen.getByRole('button', { name: /test-label/i })
  ).not.toBeDisabled();
  expect(screen.getByText('test-label')).toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('check render with isLoading=true', () => {
  render(<ButtonWithLoader label="test-label" isLoading />);

  expect(screen.getByRole('button', { name: /test-label/i })).toBeDisabled();
  expect(screen.getByText('test-label')).not.toBeVisible();
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
