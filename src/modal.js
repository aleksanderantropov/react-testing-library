import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.append(modalRoot);
}

export const Modal = ({ children }) => {
  const el = useRef(document.createElement('div'));

  useLayoutEffect(() => {
    const currentEl = el.current;
    modalRoot.append(currentEl);

    return () => modalRoot.removeChild(currentEl);
  }, []);

  return createPortal(children, el.current);
};
