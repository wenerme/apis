import React, {CSSProperties} from 'react';

export const LayoutFrameContent: React.FC<{ style?: CSSProperties }> = ({children, style}) => {
  return (
    <div style={{backgroundColor: 'white', margin: 8, padding: 12, minHeight: '100%', ...style}}>
      {children}
    </div>
  )
};
