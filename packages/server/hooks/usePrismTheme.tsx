import {useEffect, useState} from 'react';

export function usePrismTheme(theme = 'prism') {
  const [state, setState] = useState({loading: false});
  useEffect(() => {
    const themes = document.querySelectorAll<HTMLLinkElement>('link.prism-theme-hook');
    let found = false;
    for (const t of themes) {
      if (t.getAttribute('data-theme') === theme) {
        t.disabled = false;
        found = true;
      } else {
        t.disabled = true
      }
    }
    if (found) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/${theme}.min.css`
    link.className = 'prism-theme-hook';
    link.setAttribute('data-theme', theme);
    document.head.appendChild(link)
  }, [theme])
}
