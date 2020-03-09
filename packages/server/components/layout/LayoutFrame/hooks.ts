import React from 'react';
import {LayoutFrameProps} from 'components/layout/LayoutFrame/LayoutFrame';

// export interface LayoutFrameContextState extends EnhancedStore<LayoutFrameState, any> {
//   // dispatch: Dispatch<any>
//   // selector: TypedUseSelectorHook<LayoutFrameState>
//   // getState: () => LayoutFrameState
// }
//
export const LayoutFrameContext = React.createContext<LayoutFrameProps>(null);

export function useLayoutFrame(): LayoutFrameProps {
  return React.useContext(LayoutFrameContext)
}

//
// export function useLayoutFrame(s?: Partial<LayoutFrameContextState>): LayoutFrameContextState {
//   const layout = useMemo(() => {
//     return createLayoutFrame()
//   }, []);
//   return layout
// }
//
//
// function createLayoutFrame(s?: Partial<LayoutFrameContextState>): LayoutFrameContextState {
//   const slice = createLayoutFrameSlice();
//   const store = configureStore({
//     reducer: slice.reducer,
//     devTools: isDev(),
//     middleware: [
//       ...getDefaultMiddleware(),
//       isDev() ? logger : null,
//     ].filter(v => v)
//   });
//   return store
// }
//
// export const useLayoutFrameDispatch = (): Dispatch<any> => {
//   const {dispatch} = useLayoutFrame();
//   return dispatch
// };

// export const useLayoutFrameSelector: TypedUseSelectorHook<LayoutFrameState> = createSelectorHook(LayoutFrameContext)

