import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '../form';
import { axe } from 'jest-axe';

test('form is accessible', async () => {
  const { container } = render(<Form />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
