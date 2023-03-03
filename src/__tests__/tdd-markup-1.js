import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { savePost as mockSavePost } from '../api';
import { Editor } from '../editor';
import { Redirect as mockRedirect } from 'react-router-dom';

jest.mock('../api');
jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('renders editor', () => {
  render(<Editor />);

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
});

test('editor submits', async () => {
  mockSavePost.mockResolvedValueOnce();
  mockRedirect.mockReturnValueOnce(null);
  render(<Editor />);

  const newPost = {
    name: 'name',
    email: 'email@email.ru',
  };

  const button = screen.getByText(/ok/i);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  await userEvent.type(nameInput, newPost.name);
  await userEvent.type(emailInput, newPost.email);
  await userEvent.click(button);

  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith(newPost);

  expect(button).not.toBeDisabled();
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');

  expect(mockRedirect).toHaveBeenCalledTimes(1);
  expect(mockRedirect).toHaveBeenCalledWith('/');
});
