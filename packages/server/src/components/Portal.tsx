import { createPortal } from 'react-dom';
import { createElement, useEffect, useMemo } from 'react';

function getContainer() {
  if (typeof window !== 'undefined') {
    const rootContainer = document.createElement('div');
    // const parentElem = document.querySelector('#__next') ?? document.body;
    // const parentElem = document.querySelector('#__next');
    const parentElem = document.body;
    parentElem.appendChild(rootContainer);
    return rootContainer;
  }
  return null;
}

export const Portal = ({ children }) => {
  const container = useMemo(() => getContainer(), []);
  useEffect(() => {
    return () => container.remove();
  }, []);

  return container ? createPortal(children, container) :
    // children;
    createElement('div', { style: { display: 'none' } }, children);
};
