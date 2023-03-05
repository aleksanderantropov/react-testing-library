import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { savePost as mockSavePost } from '../api';
import { Editor } from '../editor';
import { Redirect as MockRedirect } from 'react-router-dom';
import { build } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker/locale/en';

jest.mock('../api');
jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderEditor = () => {
  const newPost = postBuilder.one();
  const error = errorBuilder.one();

  render(<Editor />);

  const button = screen.getByText(/ok/i);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  return {
    newPost,
    error,
    button,
    nameInput,
    emailInput,
  };
};

const postBuilder = build({
  fields: {
    name: faker.internet.userName(),
    email: faker.internet.email(),
  },
});

const errorBuilder = build({
  fields: {
    message: faker.lorem.sentence(),
  },
});

test('editor submits', async () => {
  mockSavePost.mockResolvedValueOnce();
  const { newPost, button, nameInput, emailInput } = renderEditor();
  const preDate = Date.now();

  await userEvent.type(nameInput, newPost.name);
  await userEvent.type(emailInput, newPost.email);
  await userEvent.click(button);

  expect(button).toBeDisabled();
  expect(mockSavePost).toHaveBeenCalledTimes(1);
  expect(mockSavePost).toHaveBeenCalledWith({
    ...newPost,
    date: expect.any(String),
  });

  const postDate = Date.now();
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();

  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');

  expect(MockRedirect).toHaveBeenCalledWith({ to: '/' }, {});
});

test('save post shows error', async () => {
  const { error, newPost, button, nameInput, emailInput } = renderEditor();
  mockSavePost.mockRejectedValueOnce(error);

  await userEvent.type(nameInput, newPost.name);
  await userEvent.type(emailInput, newPost.email);
  await userEvent.click(button);

  expect(screen.getByText(error.message)).toBeInTheDocument();
  expect(button).not.toBeDisabled();
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
});
