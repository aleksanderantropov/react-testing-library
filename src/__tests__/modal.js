import { render, within } from '@testing-library/react';
import React from 'react';
import { Modal } from '../modal';

test('renders modal', () => {
  const message = 'hello';
  const { unmount } = render(<Modal>{message}</Modal>);

  const modalRoot = document.getElementById('modal-root');

  const modal = within(modalRoot).getByText(message);
  expect(modal).toBeInTheDocument();

  unmount();

  expect(modal).not.toBeInTheDocument();
});
