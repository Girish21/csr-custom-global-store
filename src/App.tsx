import * as React from "react";

const initStore = <TState extends unknown>(initialState: TState) => {
  let state = initialState;
  const subscribers = new Set<(state: TState) => void>();

  return {
    getState: () => state,
    setState: (newState: TState) => {
      state = newState;
      subscribers.forEach((subscriber) => subscriber(state));
    },
    subscribe: (subscriber: (state: TState) => void) => {
      subscribers.add(subscriber);

      return () => subscribers.delete(subscriber);
    },
  };
};

const store = initStore<Cell[]>(
  Array.from({ length: 80 }, (_, i) => i).map((i) => ({ count: 0, id: i }))
);

const useStore = (select: (state: Cell[]) => Cell) =>
  React.useSyncExternalStore(store.subscribe, () => select(store.getState()));

function Cell({ id }: Cell) {
  const { count } = useStore((state) => state.find((cell) => cell.id === id)!);

  const clickHandler = () => {
    let state = store.getState();
    const index = state.findIndex((cell) => cell.id === id);
    state = [
      ...state.slice(0, index),
      { ...state[index], count: count + 1 },
      ...state.slice(index + 1),
    ];
    store.setState(state);
  };

  return <button onClick={clickHandler}>{count}</button>;
}

function App() {
  return (
    <main>
      <div id="grid">
        {store.getState().map((cell) => (
          <Cell key={cell.id} {...cell} />
        ))}
      </div>
    </main>
  );
}

type Cell = {
  id: number;
  count: number;
};

export default App;
