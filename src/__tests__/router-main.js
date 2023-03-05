import React from 'react';
import { render, screen } from 'test-utils';
import { Main } from '../router-main';
import user from '@testing-library/user-event';

test('renders Main and can navigate', async () => {
  render(<Main />);

  expect(screen.getByRole('heading')).toHaveTextContent(/home/i);

  await user.click(screen.getByRole('link', { name: /about/i }));

  expect(screen.getByRole('heading')).toHaveTextContent(/about/i);
});

test('renders NotFound when wrong route', async () => {
  render(<Main />, { route: '/404' });

  expect(screen.getByRole('heading')).toHaveTextContent(/not found/i);
});
