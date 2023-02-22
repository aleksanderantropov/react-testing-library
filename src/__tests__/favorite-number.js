import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FavoriteNumber } from '../favorite-number';

test('renders component "FavoriteNumber"', () => {
  render(<FavoriteNumber />);

  const input = screen.getByLabelText(/favorite number/i);
  expect(input).toHaveAttribute('type', 'number');
});

test('entering an invalid value shows error message', async () => {
  const { rerender } = render(<FavoriteNumber />);

  const input = screen.getByLabelText(/favorite number/i);
  await userEvent.type(input, '10');

  expect(await screen.findByRole('alert')).toHaveTextContent(
    /the number is invalid/i
  );

  rerender(<FavoriteNumber max={10} />);

  expect(screen.queryByRole('alert')).toBeNull();
});
