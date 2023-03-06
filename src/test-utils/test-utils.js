import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
export * from '@testing-library/react';

export const render = (
  ui,
  {
    route = '/',
    preloadedState = { counter: { value: 0 } },
    store = setupStore(preloadedState),
    history = [route],
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={history}>{children}</MemoryRouter>
      </Provider>
    );
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
