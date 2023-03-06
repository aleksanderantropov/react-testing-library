import { act, render, renderHook } from '@testing-library/react';
import React from 'react';
import { useCounter } from '../use-counter';

test('correctly returns count and increment/decrement functions', () => {
  const { result } = renderHook(useCounter);

  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test('allows customization of initial state', () => {
  const { result } = renderHook(() => useCounter({ initialCount: 4 }));
  expect(result.current.count).toBe(4);
});

test('allows customization of step', () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } });

  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test('the step can be changed', () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 2 },
  });

  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  rerender({ step: 1 });
  act(() => result.current.decrement());
  expect(result.current.count).toBe(1);
});
