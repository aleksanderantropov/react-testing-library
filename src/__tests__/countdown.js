import { act, render } from '@testing-library/react';
import React from 'react';
import { Countdown } from '../countdown';

beforeAll(() => {
  jest.useFakeTimers();
  jest.spyOn(window, 'clearInterval').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

test('correctly outputs time and clears interval', async () => {
  const { unmount } = render(<Countdown time={5} />);

  unmount();

  expect(clearInterval).toHaveBeenCalled();
});
