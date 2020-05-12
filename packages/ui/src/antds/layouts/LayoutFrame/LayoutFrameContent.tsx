import React, { CSSProperties } from 'react';
import { useNamedTheme } from '../../../hooks/useNamedTheme';

export const LayoutFrameContent: React.FC<{ style?: CSSProperties }> = ({ children, style }) => {
  const [theme] = useNamedTheme();
  return (
    <div
      style={{
        ...(theme !== 'dark' ? { backgroundColor: 'white' } : {}),
        margin: 8,
        padding: 12,
        minHeight: 'calc(100% - 16px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
