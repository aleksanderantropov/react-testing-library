import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from '../error-boundary';
import { report as mockReport } from '../api';

jest.mock('../api');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

const Bomb = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('💣');
  }

  return null;
};

test('renders error boundary', () => {
  mockReport.mockResolvedValueOnce({ success: true });
  render(
    <ErrorBoundary>
      <Bomb shouldThrow />
    </ErrorBoundary>
  );

  const error = expect.any(Error);
  const info = { componentStack: expect.any(String) };
  expect(mockReport).toHaveBeenCalledWith(error, info);
  expect(mockReport).toHaveBeenCalledTimes(1);
});
