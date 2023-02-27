import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

export const HiddenMessage = () => {
  const [shown, setShown] = useState(true);

  return (
    <div>
      <button onClick={() => setShown((on) => !on)}>Toggle</button>
      <CSSTransition in={shown} unmountOnExit timeout={1000}>
        <div></div>
      </CSSTransition>
    </div>
  );
};
