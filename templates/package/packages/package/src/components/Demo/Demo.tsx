import React, { useState } from 'react';

/**
 * Demo component
 */
export const Demo: React.FC<{ title?: string; onClick? }> = ({ children, title, ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <div {...props}>
      <h2 onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        Demo {title} {hover && <a href="#">#</a>}
      </h2>
      <div>{children}</div>
    </div>
  );
};
