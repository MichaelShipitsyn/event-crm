import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { ButtonWithLoader } from './ButtonWithLoader';

test('contain label prop', async () => {
  render(<ButtonWithLoader label="test-label" isLoading={false} />);

  expect(screen.getByText('test-label')).toBeInTheDocument();
});
