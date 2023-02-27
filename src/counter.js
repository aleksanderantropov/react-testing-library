import React from 'react';
import { useState } from 'react';

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>Count: {counter}</div>
      <div>
        <button onClick={() => setCounter((count) => count + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
};
