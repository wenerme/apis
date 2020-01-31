import React from 'react';

export const PageContent: React.FC = ({children}) => {
  return (
    <div style={{backgroundColor: 'white', margin: 8, padding: 12, minHeight: '100%'}}>
      {children}
    </div>
  )
};
