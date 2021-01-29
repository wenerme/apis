import { LayoutFrameContent } from 'src/ui/antds';
import React from 'react';
import { PageHeader } from 'antd';

export const WenerApisContent: React.FC<{ title?; header?; icon? }> = ({ title, icon, header, children }) => {
  return (
    <LayoutFrameContent>
      {title && (
        <PageHeader
          title={
            <div>
              {icon}
              {title}
            </div>
          }
          backIcon={false}
        />
      )}
      {header}
      {children}
    </LayoutFrameContent>
  );
};
