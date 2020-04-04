import { TypedUseSelectorHook } from 'react-redux';
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { MenuSpec } from './types';
import { LayoutFrameState } from 'src/antds/layouts/LayoutFrame/state';
import { BehaviorSubject } from 'rxjs';
import produce from 'immer';

export interface LayoutFrameInstance {
  readonly name;

  subscribe(consumer: (state: LayoutFrameState) => void): () => void;

  update(update: (state: LayoutFrameState) => void);

  getState(): LayoutFrameState;

  dispose(): void;
}

export interface LayoutFrameOptions {
  name?: string;
  menus: MenuSpec[];
  link?: ({ href }) => React.ReactNode;
}

const LayoutFrameContext = React.createContext<{
  layout: LayoutFrameInstance;
  options: LayoutFrameOptions;
}>(null as any);

export const useLayoutFrameSelector: TypedUseSelectorHook<LayoutFrameState> = (selector, eq?) => {
  const layout = useLayoutFrame();
  const ref = useRef<any>();
  const [state, setState] = useState<any>(() => (ref.current = selector(layout.getState())));
  useEffect(() => {
    return layout.subscribe((s) => {
      const next = selector(s);
      if ((eq && !eq(next, ref.current)) || next !== ref.current) {
        setState((ref.current = next));
      }
    });
  }, []);
  return state;
};

export function useLayoutFrameOptions(): LayoutFrameOptions {
  return useContext(LayoutFrameContext).options;
}

// class LayoutFrameStore implements LayoutFrameInstance {
//   name = 'default';
//   context = LayoutStoreContext;
//   store: Store<LayoutFrameState>;
//   useSelector: TypedUseSelectorHook<LayoutFrameState>;
//   dispatch;
//   forceRootUpdate: () => void;
//
//   constructor({ forceRootUpdate, name = 'default' }) {
//     this.forceRootUpdate = forceRootUpdate;
//     this.name = name;
//
//     const slice = createLayoutFrameSlice();
//     this.store = configureStore(slice);
//     this.dispatch = this.store.dispatch;
//     this.useSelector = createSelectorHook(this.context);
//   }
//
//   selector = (s) => s;
//
//   getLayout(): LayoutFrameInstance {
//     // const {name, store, context} = this;
//     // return {
//     //   name,
//     //   dispatch: store.dispatch,
//     //   selector: s => s,
//     //   useSelector: createSelectorHook(context),
//     // }
//     return this;
//   }
// }

export const LayoutFrameProvider: React.FC<{
  layout: LayoutFrameInstance;
  options: LayoutFrameOptions;
}> = ({ layout, options, children }) => {
  return <LayoutFrameContext.Provider value={{ layout, options }}>{children}</LayoutFrameContext.Provider>;
};

function createLayoutFrame(
  options: {
    current?: LayoutFrameInstance;
    initialState?: Partial<LayoutFrameState> | (() => Partial<LayoutFrameState>);
    name?: string;
  } = {},
): LayoutFrameInstance {
  const { initialState, name = 'default', current } = options;
  const state = new BehaviorSubject<LayoutFrameState>({
    ...(typeof initialState === 'function' ? initialState() : initialState ?? {}),
  });

  const layout = {
    get name() {
      return name;
    },
    subscribe(consumer: (state: LayoutFrameState) => void): () => void {
      const s = state.subscribe(consumer);
      return s.unsubscribe.bind(s);
    },
    getState(): LayoutFrameState {
      return state.value;
    },
    update(update: ((state: LayoutFrameState) => void) | Partial<LayoutFrameState>) {
      if (typeof update !== 'function') {
        layout.update((s) => {
          Object.assign(s, update);
        });
        return;
      }
      const current = state.value;
      const next = produce(current, update as (state: LayoutFrameState) => void);
      if (current !== next) {
        state.next(next);
        console.debug(`next layout state`, next, current);
      }
    },
    dispose(): void {
      //
    },
  };

  return layout;
}

export function useLayoutFrame(options?: {
  layout?: LayoutFrameInstance;
  initialState?: Partial<LayoutFrameState> | (() => Partial<LayoutFrameState>);
  name?: string;
}): LayoutFrameInstance {
  const { layout, name = 'default', initialState } = options || {};
  const instanceRef = React.useRef<LayoutFrameInstance>();
  const [, forceRootUpdate] = useReducer((a) => a + 1, 0);

  const current = useContext(LayoutFrameContext)?.layout;
  if (!instanceRef.current) {
    if (current && current.name === name) {
      instanceRef.current = current;
    } else if (layout) {
      instanceRef.current = layout;
    } else {
      // const layoutStore = new LayoutFrameStore({ forceRootUpdate, name });
      instanceRef.current = createLayoutFrame({ name, initialState, current });
    }
  }
  return instanceRef.current;
}
