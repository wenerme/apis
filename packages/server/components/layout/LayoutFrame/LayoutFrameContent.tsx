import React, {CSSProperties} from 'react';
import {useLayoutDarkLightTheme} from 'components/layout/LayoutFrame/layout';

export const LayoutFrameContent: React.FC<{ style?: CSSProperties }> = ({children, style}) => {
  const theme = useLayoutDarkLightTheme()
  return (
    <div style={{
      ...(theme === 'light' ? {backgroundColor: 'white'} : {}),
      margin: 8,
      padding: 12,
      minHeight: 'calc(100% - 16px)', ...style
    }}>
      {children}
    </div>
  )
};
