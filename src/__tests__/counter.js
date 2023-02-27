import React from 'react';
import { render, screen } from '@testing-library/react';
import { Counter } from '../counter';
import userEvent from '@testing-library/user-event';

test('correctly renders Counter', async () => {
  const { rerender } = render(<Counter />);

  expect(screen.getByText(/count/i)).toBeInTheDocument();

  const button = screen.getByText(/increment/i);
  await userEvent.click(button);

  expect(screen.getByText(/count/i)).toHaveTextContent('1');

  rerender(<Counter />);

  screen.debug();
});
