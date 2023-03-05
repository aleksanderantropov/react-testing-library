import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../router-main';
import user from '@testing-library/user-event';

test('renders Main and can navigate', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Main />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading')).toHaveTextContent(/home/i);

  await user.click(screen.getByRole('link', { name: /about/i }));

  expect(screen.getByRole('heading')).toHaveTextContent(/about/i);
});
