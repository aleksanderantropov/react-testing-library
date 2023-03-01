import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../error-boundary';
import { reportError as mockReport } from '../api';
import userEvent from '@testing-library/user-event';

jest.mock('../api');

const Bomb = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('💣');
  }

  return null;
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

afterEach(() => jest.clearAllMocks());

test('renders error boundary', async () => {
  mockReport.mockResolvedValueOnce({ success: true });
  const { rerender } = render(<Bomb shouldThrow />, {
    wrapper: ErrorBoundary,
  });

  const error = expect.any(Error);
  const info = { componentStack: expect.any(String) };
  expect(mockReport).toHaveBeenCalledWith(error, info);
  expect(mockReport).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledTimes(3);

  expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
<div
  role="alert"
>
  Something went wrong
  <button>
    Try Again
  </button>
</div>
`);

  mockReport.mockClear();
  console.error.mockClear();

  rerender(<Bomb />);

  const button = screen.getByText(/try again/i);
  await userEvent.click(button);

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(mockReport).not.toHaveBeenCalled();
  expect(console.error).not.toHaveBeenCalled();
});
