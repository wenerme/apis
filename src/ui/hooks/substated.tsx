import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { useConstant } from './useConstant';
import produce from 'immer';

/// https://github.com/jamiebuilds/unstated-next/blob/master/src/unstated-next.tsx

const EMPTY: unique symbol = Symbol();

export interface SubscriptionContainerProviderProps<State = void> {
  initialState: State | (() => State);
  children: React.ReactNode;
}

export type Equality<T = any> = (a: T, b: T) => boolean;

export interface SubscriptionContainer<Value, State = void> {
  Provider: React.ComponentType<SubscriptionContainerProviderProps<State>>;
  useContainer: () => Value;
  useState: () => State;

  useSelector<TSelected>(selector: (state: State) => TSelected, eq?: Equality): TSelected;

  useWhenValueChange<TSelected>(selector: (state: State) => TSelected, cb: (s: TSelected) => void, eq?: Equality);
}

export interface SubscriptioHookOptions<State> {
  getState(): State;

  setState(s: ((s: State) => State) | State);

  updateState(s: (s: State) => void);

  subscribe(cb: (s: State) => void): () => void;
}

export type SubscriptionHook<State, Value> = (options: SubscriptioHookOptions<State>) => Value;

export function createSubscriptionContainer<Value, State = void>(
  useHook: SubscriptionHook<State, Value>,
  { isEqual }: { isEqual: (a: any, b: any) => boolean } = { isEqual: (a, b) => a === b },
): SubscriptionContainer<Value, State> {
  const Context = React.createContext<{ subject: BehaviorSubject<State>; container: Value } | typeof EMPTY>(EMPTY);

  function Provider(props: SubscriptionContainerProviderProps<State>) {
    const subject = useConstant(() => {
      const initialState = props.initialState;
      // type fixing
      return new BehaviorSubject(typeof initialState === 'function' ? (initialState as any)() : initialState);
    });
    const container = useConstant(() => {
      const setStateReal = (state) => {
        let next;
        if (typeof state === 'function') {
          next = (state as any)(subject.getValue());
        } else {
          next = state;
        }
        subject.next(next);
      };

      // handle change state when subscribe
      let changing = false;
      const setState = (state) => {
        if (changing) {
          setTimeout(() => setState(state), 0);
          return;
        }
        changing = true;
        try {
          setStateReal(state);
        } finally {
          changing = false;
        }
      };
      const options: SubscriptioHookOptions<State> = {
        getState: () => subject.getValue(),
        setState,
        updateState(fn) {
          // todo produced is immutable
          setState(
            produce((v) => {
              fn(v);
              // ensure return void
            }),
          );
        },
        subscribe(cb) {
          const subscription = subject.subscribe(cb);
          return subscription.unsubscribe.bind(subscription);
        },
      };
      return useHook(options);
    });
    return <Context.Provider value={{ container, subject }}>{props.children}</Context.Provider>;
  }

  function useContainer(): Value {
    const context = React.useContext(Context);
    if (context === EMPTY) {
      throw new Error('Component must be wrapped with <SubscriptionContainer.Provider>');
    }
    return context.container;
  }

  function useSelector<TSelected>(
    selector: (s: State) => TSelected,
    eq: (a?: TSelected, b?: TSelected) => boolean = isEqual,
  ) {
    const context = React.useContext(Context);
    if (context === EMPTY) {
      throw new Error('Component must be wrapped with <SubscriptionContainer.Provider>');
    }
    const subject = context.subject;
    const [state, setState] = React.useState(() => selector(subject.getValue()));
    useEffect(() => {
      const subscription = subject.pipe(skip(1)).subscribe((s) => {
        setState((old) => {
          const next = selector(s);
          if (eq(old, next)) {
            return old;
          }
          return next;
        });
      });
      return () => subscription.unsubscribe();
    }, []);
    return state;
  }

  function useState() {
    return useSelector((v) => v);
  }

  function useWhenValueChange(selector, cb, eq = isEqual) {
    const context = React.useContext(Context);
    if (context === EMPTY) {
      throw new Error('Component must be wrapped with <SubscriptionContainer.Provider>');
    }
    const subject = context.subject;
    const ref = React.useRef();
    useEffect(() => {
      ref.current = selector(subject.getValue());

      const subscription = subject.subscribe((s) => {
        const old = ref.current;
        const next = selector(s);
        if (!eq(old, next)) {
          cb(next);
          ref.current = next;
        }
      });
      return () => subscription.unsubscribe();
    }, []);
  }

  return { Provider, useContainer, useSelector, useState, useWhenValueChange };
}
