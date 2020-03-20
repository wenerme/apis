import {useEffect, useState} from 'react';
import components from 'prismjs/components'
import getLoader from 'prismjs/dependencies'
import Prism from 'prismjs/components/prism-core'
import {Immer} from 'immer';

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
            script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-${id}.min.js`;
            // script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-${id}.js`;
            script.onload = () => {
              if (!loaded.includes(id)) {
                loaded.push(id);
              }
              resolve();
            };
            script.onerror = reject;
            document.body.appendChild(script);
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
