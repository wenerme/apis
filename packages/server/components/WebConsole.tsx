import React, {useRef, useState} from 'react';
import {useAsyncEffect} from 'hooks/useAsyncEffect';
import produce from 'immer';

export const AllMethods: Methods[] = ['log', 'warn', 'error', 'info', 'debug', 'command', 'result'];
export type Methods =
  | 'log'
  | 'warn'
  | 'error'
  | 'info'
  | 'debug'
  | 'command'
  | 'result'

export interface Log {
  // The log method
  method: Methods
  // The arguments passed to console API
  data: any[]
}

export interface WebConsoleProps {
  filters?: Methods[]
  variant?
  styles?
  searchKeywords?
  logFilter?

  global?: boolean
  onConsoleLoad?: (console: Console) => void
}

export const WebConsole: React.FC<WebConsoleProps> = (props) => {
  const {onConsoleLoad, global, ...consoleProps} = props
  const [logs, setLogs] = useState([]);
  const consoleRef = useRef<any>();
  const containerRef = useRef<any>();
  const consoleFeedRef = useRef<any>();

  // lazy init faster page load
  useAsyncEffect(async () => {
    const {Console: ConsoleFeed, Hook, Unhook} = await import('console-feed');
    consoleFeedRef.current = ConsoleFeed;

    let console: Console;
    if (global) {
      console = window.console;
    } else {
      console = {} as any;
      ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear', 'time', 'timeEnd', 'count', 'assert'].map(v => console[v] = window.console[v]);
    }

    consoleRef.current = console;
    Hook(console,
      log => {
        setLogs(produce(s => {
          s.push(log)
        }))
      },
      false
    );

    console.debug('Init console');
    onConsoleLoad?.(console);
    return () => {
      Unhook(console);
    };
  }, []);

  return (
    <div ref={containerRef} style={{
      backgroundColor: '#242424',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexFlow: 'column-reverse'
    }}>
      {consoleFeedRef.current && <consoleFeedRef.current logs={logs} variant="dark" {...consoleProps} />}
    </div>
  )
};
