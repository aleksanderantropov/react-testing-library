import React from 'react';
import { render, screen } from 'test-utils';
import { Counter } from '../counter';
import user from '@testing-library/user-event';

test('correctly renders Counter', async () => {
  render(<Counter />);

  const output = screen.getByText(/count: 0/i);

  await user.click(screen.getByRole('button', { name: '-' }));

  expect(output).toHaveTextContent(/count: -1/i);

  await user.click(screen.getByRole('button', { name: '+' }));

  expect(output).toHaveTextContent(/count: 0/i);
});

test('correctly renders Counter with initial state', () => {
  render(<Counter />, {
    preloadedState: { counter: { value: 4 } },
  });

  expect(screen.getByText(/count: /i)).toHaveTextContent('4');
});
