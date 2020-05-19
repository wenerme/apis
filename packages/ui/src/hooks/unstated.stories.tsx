import React from 'react';
import { createContainer } from './unstated';

export default {
  title: 'hooks/unstated',
};

function useCounter(initialState = 0) {
  const [count, setCount] = React.useState(initialState);
  const decrement = () => setCount(count - 1);
  const increment = () => setCount(count + 1);
  return { count, decrement, increment };
}

const Counter = createContainer(useCounter);

function CounterDisplay() {
  const counter = Counter.useContainer();
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  );
}

export const UnstatedCounter = () => {
  return (
    <Counter.Provider>
      <CounterDisplay />
      <CounterDisplay />
      <Counter.Provider initialState={2}>
        <div>
          <div>
            <CounterDisplay />
          </div>
        </div>
      </Counter.Provider>
    </Counter.Provider>
  );
};
