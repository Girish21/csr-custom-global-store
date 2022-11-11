import * as React from "react";

const initStore = <TState extends unknown>(initialState: TState) => {
  let store = initialState;
  const listeners = new Set<(state: TState) => void>();

  return {
    getState: () => store,
    setState: (newState: TState) => {
      store = newState;
      listeners.forEach((listener) => listener(newState));
    },
    subscribe: (listener: (state: TState) => void) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
};

const store = initStore<Store>({ firstName: "", lastName: "" });

const useStore = (select: (state: Store) => string) => {
  const [, setState] = React.useState(select(store.getState()));

  React.useEffect(() => {
    return store.subscribe((state) => setState(select(state)));
  }, []);

  return store;
};

function Input({ name }: { name: Fields }) {
  const { getState, setState } = useStore(
    React.useCallback((state) => state[name], [name])
  );

  return (
    <fieldset>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        value={getState()[name]}
        onChange={(e) =>
          setState({ ...getState(), [name]: e.currentTarget.value })
        }
      />
    </fieldset>
  );
}

function App() {
  return (
    <main>
      <Input name="firstName" />
      <Input name="lastName" />
    </main>
  );
}

type Store = {
  firstName: string;
  lastName: string;
};

type Fields = keyof Store;

export default App;
