import React, {CSSProperties} from 'react';
import {useRootSelector} from 'reducers';

export const PageContent: React.FC<{ style?: CSSProperties }> = ({children, style}) => {
  const isLight = useRootSelector(v => v.layout.isLight);
  return (
    <div style={{backgroundColor: isLight ? 'white' : '#002140', margin: 8, padding: 12, minHeight: '100%', ...style}}>
      {children}
    </div>
  )
};
