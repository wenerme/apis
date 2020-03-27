import React, { CSSProperties } from 'react';
import { useLayoutTheme } from 'src/components/layout/LayoutFrame/theme';

export const LayoutFrameContent: React.FC<{ style?: CSSProperties }> = ({ children, style }) => {
  const [theme] = useLayoutTheme();
  return (
    <div
      style={{
        ...(theme === 'light' ? { backgroundColor: 'white' } : {}),
        margin: 8,
        padding: 12,
        minHeight: 'calc(100% - 16px)',
        ...style
      }}
    >
      {children}
    </div>
  );
};
