import React from 'react';
import { ExternalLink } from './ExternalLink';
import Link from 'next/link';

export const IsomorphicLink: React.FC<{ href; [k: string]: any }> = ({ href, children, ...rest }) => {
  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <ExternalLink href={href} {...rest}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};
