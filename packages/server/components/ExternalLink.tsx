import React from 'react';

export interface ExternalLinkProps {
  href: string
  title?
}

export const ExternalLink: React.FC<ExternalLinkProps> = (props) => {
  let {href, title} = props;
  ({href, title} = normalizeLinkTitle({href, title}));
  return <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
};

export function normalizeLinkTitle(opts: ExternalLinkProps): ExternalLinkProps {
  const {href} = opts;
  let {title} = opts;
  if (!title) {
    const u = new URL(href)

    switch (u.origin) {
      case 'https://github.com/': {
        // https://github.com/zeit/next.js/issues/9524
        const match = u.pathname.match(/^\/(?<repo>[^/]\/[^/])(\/issues\/(?<issues>\d+))?/);
        const {repo, issues} = match.groups;
        if (repo) {
          if (issues) {
            title = `${repo}#${issues}`
          } else {
            title = repo;
          }
        }
        break
      }
      default:
    }
    if (!title) {
      title = href.replace(/^https?:\/\//, '')
    }
    // <GithubOutlined />
  }
  return {href, title}
}
