import React from 'react';

export const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return <a target="_blank" rel={'noopener noreferrer'} {...props} />;
};
