import {useImmer} from 'use-immer';
import {useEffect, useState} from 'react';
import components from 'prismjs/components'
import getLoader from 'prismjs/dependencies'
import Prism from 'prismjs/components/prism-core'
import {Immer} from 'immer';

let version = `1.19.0`;

export function setVersion(v) {
  version = v
}

function _prism() {
  return `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}`;
}

function selectTheme(theme: string) {
  const cur = document.querySelector<HTMLLinkElement>(`link.prism-theme-hook[data-theme=${theme}]`);
  if (!cur) {
    return false
  }

  cur.disabled = false;
  const themes = document.querySelectorAll<HTMLLinkElement>(`link.prism-theme-hook:not([data-theme=${theme}])`);
  themes.forEach(v => v.disabled = true);
  return true
}

export function usePrismTheme(theme = 'prism') {
  const [state, updateState] = useImmer({loading: false, error: undefined});
  useEffect(() => {
    if (selectTheme(theme)) {
      return;
    }
    updateState(s => {
      s.loading = true;
      s.error = undefined
    });
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${_prism()}/themes/${theme}.min.css`;
    link.className = 'prism-theme-hook';
    link.setAttribute('data-theme', theme);
    link.onload = () => {
      selectTheme(theme);
      updateState(s => {
        s.loading = false;
      });
    };
    link.onerror = (e) => {
      const err = typeof e === 'string' ? e : e?.['error'];
      updateState(s => {
        s.loading = false;
        s.error = err
      });
    };
    document.head.appendChild(link)
  }, [theme]);
  const {loading, error} = state;
  return {loading, error}
}


const loaded = [];
const immer = new Immer();
immer.setAutoFreeze(false);
const {produce} = immer;

export function usePrismLanguage(language) {
  const [state, setState] = useState({
    loading: !(loaded.includes(language) || Prism.languages[language]),
    grammar: Prism.languages[language],
    error: undefined,
  });

  useEffect(() => {
    window['Prism'] = window['Prism'] ?? Prism;
    if (loaded.includes(language) || Prism.languages[language]) {
      setState(produce(s => {
        s.loading = false;
        s.grammar = Prism.languages[language];
        s.error = undefined
      }));
      return
    }

    setState(produce(s => {
      s.loading = true;
      s.error = undefined;
    }));
    getLoader(components, [language], loaded)
      .load(
        id => {
          return new Promise(((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${_prism()}/components/prism-${id}.min.js`;
            // script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-${id}.js`;
            script.onload = () => {
              if (!loaded.includes(id)) {
                loaded.push(id);
              }
              resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
          }))
        },
        {
          series: async (before, after) => {
            await before;
            await after();
          },
          parallel: async (values) => {
            await Promise.all(values);
          }
        })
      .then(() => {
        setState(produce(s => {
          s.loading = false;
          s.grammar = Prism.languages[language];
          s.error = undefined
        }));
      })
      .catch(e => {
        setState(produce(s => {
          s.loading = false;
          s.error = e
        }));
      })
  }, [language]);

  const {loading, error, grammar} = state;
  return {loading, error, grammar, Prism}
}
