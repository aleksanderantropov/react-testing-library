import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HiddenMessage } from '../hidden-message';
import userEvent from '@testing-library/user-event';

jest.mock('react-transition-group', () => ({
  CSSTransition: (props) => (props.in ? props.children : null),
}));

test('renders hidden message', async () => {
  const message = 'Message';
  render(<HiddenMessage>{message}</HiddenMessage>);

  const button = screen.getByText(/toggle/i);

  expect(screen.queryByText(message)).not.toBeInTheDocument();
  await userEvent.click(button);
  expect(screen.getByText(message)).toBeInTheDocument();
  await userEvent.click(button);
  expect(screen.queryByText(message)).not.toBeInTheDocument();
});
