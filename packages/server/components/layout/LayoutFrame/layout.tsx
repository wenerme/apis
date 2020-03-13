import {createSelectorHook, Provider, ReactReduxContextValue, TypedUseSelectorHook} from 'react-redux';
import {LayoutState} from 'reducers/layout';
import {Dispatch, Store} from 'redux';
import React, {useContext, useReducer} from 'react';
import {createLayoutFrameSlice, LayoutFrameState} from 'components/layout/LayoutFrame/reducers';
import {configureStore} from '@reduxjs/toolkit';
import {MenuSpec} from 'components/layout/LayoutFrame/types';

export interface LayoutFrameInstance {
  readonly name;
  readonly dispatch: Dispatch<any>;
  readonly selector: (s) => LayoutState;

  readonly useSelector
}

export interface LayoutFrameOptions {
  name?: string
  menus: MenuSpec[]
  link?: ({href}) => React.ReactNode
}

const LayoutFrameInstanceContext = React.createContext<{ layout: LayoutFrameInstance, options: LayoutFrameOptions }>(null);

export const useLayoutFrameSelector: TypedUseSelectorHook<LayoutState> = (s, eq?) => {
  const {useSelector, selector} = useContext(LayoutFrameInstanceContext).layout;
  return useSelector(state => s(selector(state)), eq)
};

export function useLayoutFrameOptions(): LayoutFrameOptions {
  return useContext(LayoutFrameInstanceContext).options;
}

class LayoutFrameStore implements LayoutFrameInstance {
  name = 'default';
  context = LayoutStoreContext;
  store: Store<LayoutFrameState>;
  useSelector: TypedUseSelectorHook<LayoutFrameState>;
  dispatch;
  forceRootUpdate: () => void;

  constructor({forceRootUpdate, name = 'default'}) {
    this.forceRootUpdate = forceRootUpdate;
    this.name = name;

    const slice = createLayoutFrameSlice();
    this.store = configureStore(slice);
    this.dispatch = this.store.dispatch;
    this.useSelector = createSelectorHook(this.context);
  }

  selector = s => s;

  getLayout(): LayoutFrameInstance {
    // const {name, store, context} = this;
    // return {
    //   name,
    //   dispatch: store.dispatch,
    //   selector: s => s,
    //   useSelector: createSelectorHook(context),
    // }
    return this
  }
}

const LayoutStoreContext = React.createContext<ReactReduxContextValue>(null);

export const LayoutFrameProvider: React.FC<{ layout: LayoutFrameInstance, options: LayoutFrameOptions }> = ({layout, options, children}) => {
  const store = layout as LayoutFrameStore
  return (
    <LayoutFrameInstanceContext.Provider value={{layout, options}}>
      <Provider store={store.store} context={store.context}>
        {children}
      </Provider>
    </LayoutFrameInstanceContext.Provider>
  )
};

export function useLayoutFrame(layout?: LayoutFrameInstance, {name = null} = {}): LayoutFrameInstance {
  const instanceRef = React.useRef<LayoutFrameInstance>();
  const [, forceRootUpdate] = useReducer(a => a + 1, 0);

  if (!instanceRef.current) {
    if (layout) {
      instanceRef.current = layout;
    } else {
      const layoutStore = new LayoutFrameStore({forceRootUpdate, name});
      instanceRef.current = layoutStore.getLayout();
    }
  }
  return instanceRef.current
}

export const useLayoutDarkLightTheme: () => 'dark' | 'light' = () => useLayoutFrameSelector(s => s.theme as any);
