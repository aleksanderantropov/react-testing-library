import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decremented, incremented } from './store/store';

export const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((store) => store.counter.value);

  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => dispatch(incremented())}>+</button>
        <button onClick={() => dispatch(decremented())}>-</button>
      </div>
    </div>
  );
};
