import { createPortal } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

export const Portal: React.FC<{ selector?: string }> = ({ children, selector }) => {
  const ref = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector ?? 'body');
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};
