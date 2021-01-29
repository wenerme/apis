import React from 'react';
import { NgPageHeader } from './NgPageHeader';
import { NgPageFooter } from './NgPageFooter';

export const NgPageLayout: React.FC = ({ children }) => {
  return (
    <div className={'min-h-screen flex flex-col'}>
      <NgPageHeader />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      <NgPageFooter />
    </div>
  );
};
