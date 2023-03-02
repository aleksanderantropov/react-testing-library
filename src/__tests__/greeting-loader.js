import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { GreetingLoader } from '../greeting-loader-01-mocking';

const server = setupServer(
  rest.post('/greeting', async (req, res, ctx) => {
    const { message } = await req.json();

    return res(
      ctx.json({
        greeting: message,
      })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads greetings on click', async () => {
  const message = 'some input';

  render(<GreetingLoader />);

  const input = screen.getByLabelText(/name/i);
  const submitButton = screen.getByText(/load greeting/i);
  const output = screen.getByLabelText(/greeting/i);

  await userEvent.type(input, message);
  await userEvent.click(submitButton);

  expect(output).toHaveTextContent(message);
});
