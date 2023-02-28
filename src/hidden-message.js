import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export const HiddenMessage = ({ children }) => {
  const [shown, setShown] = useState(false);

  return (
    <div>
      <button onClick={() => setShown((on) => !on)}>Toggle</button>
      <CSSTransition in={shown} unmountOnExit timeout={1000}>
        <div>{children}</div>
      </CSSTransition>
    </div>
  );
};
