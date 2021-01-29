import React from 'react';
import { createSubscriptionContainer, SubscriptioHookOptions } from './substated';
import { useRenderCount } from './useRenderCount';
import { useForceRender } from './useForceRender';

export default {
  title: 'hooks/substated',
};

function useCounter({
  setState,
  getState,
  updateState,
  subscribe,
}: SubscriptioHookOptions<{ count: number; extra?: number }>) {
  console.log(`Call useCounter`, getState());
  const decrement = () => updateState((s) => s.count--);
  const increment = () => updateState((s) => s.count++);
  const onExtraChange = () => updateState((s) => (s.extra = Math.random()));
  subscribe((v) => {
    if (v.count === 5) {
      updateState((s) => (s.count = 0));
    }
  });
  subscribe((v) => {
    console.log(`State`, v);
  });
  return { decrement, increment, onExtraChange };
}

const Counter = createSubscriptionContainer(useCounter);

function CounterValue() {
  const count = Counter.useSelector((v) => v.count);
  const rc = useRenderCount();
  return (
    <span>
      {count} - Render: <small>{rc}</small>
    </span>
  );
}

function CounterDisplay() {
  const counter = Counter.useContainer();
  const rc = useRenderCount();
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <CounterValue />
      <button onClick={counter.increment}>+</button>
      <small>Render:{rc}</small>
    </div>
  );
}

function Actions() {
  const { onExtraChange } = Counter.useContainer();
  const extra = Counter.useSelector((v) => v.extra);
  return <button onClick={onExtraChange}>Extra Change - {extra || ''}</button>;
}

export const CounterDemo = () => {
  const forceUpdate = useForceRender();
  return (
    <Counter.Provider initialState={{ count: 0 }}>
      <button onClick={forceUpdate}>ReRender</button>
      <Actions />
      <CounterDisplay />
      <CounterDisplay />
      <Counter.Provider initialState={{ count: 2 }}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>
    </Counter.Provider>
  );
};
