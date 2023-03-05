import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
export * from '@testing-library/react';

export const render = (
  ui,
  { route = '/', history = [route], ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return <MemoryRouter initialEntries={history}>{children}</MemoryRouter>;
  };

  const utils = rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return {
    ...utils,
    history,
  };
};
