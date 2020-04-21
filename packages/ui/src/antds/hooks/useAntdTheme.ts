import { useEffect } from 'react';
import { loadStyles, MaybePromise } from '@wener/utils';

interface LoadThemeOption {
  theme: string;
  type: string;
  url?: string;
}

function loadTheme(options: LoadThemeOption): MaybePromise<boolean> {
  const { theme, type, url = '' } = options ?? {};
  const attr = `data-${type}-theme`;
  const cur = document.querySelector<HTMLLinkElement>(`link[${attr}="${theme}"]`);
  if (!cur) {
    if (url) {
      console.info(`load theme ${type} ${theme} ${url}`);
      return loadStyles(url, {
        attributes: {
          [attr]: theme,
        },
      }).then(() => {
        // disable others
        const themes = document.querySelectorAll<HTMLLinkElement>(`link[${attr}]:not([${attr}="${theme}"])`);
        themes.forEach((v) => v.setAttribute('disabled', 'true'));
        return true;
      });
    }
    return false;
  }

  const themes = document.querySelectorAll<HTMLLinkElement>(`link[${attr}]:not([${attr}="${theme}"])`);
  themes.forEach((v) => v.setAttribute('disabled', 'true'));
  cur.removeAttribute('disabled');

  return true;
}

// fixme - should use current version ?
const urls = {
  light: 'https://unpkg.com/antd/dist/antd.min.css',
  dark: 'https://unpkg.com/antd/dist/antd.dark.min.css',
};

export function loadAntdTheme(options?: { theme; src? }): MaybePromise<boolean> {
  const { theme = 'light', src } = options || {};
  const url = src || urls[theme];
  if (!url) {
    console.error(`Theme not found: ${theme}`);
    return false;
  }
  return loadTheme({
    theme,
    type: 'antd',
    url,
  });
}

export function useAntdTheme(options?: { theme; src? }) {
  const { theme = 'light', src } = options || {};

  useEffect(() => {
    const url = src || urls[theme];
    if (!url) {
      console.error(`Theme not found: ${theme}`);
      return;
    }
    loadTheme({
      theme,
      type: 'antd',
      url,
    });
  }, [theme, src]);
}
