import * as React from "react";

function Input({ name }: { name: Fields }) {
  const value = useStore((state) => state[name]);

  return (
    <fieldset>
      <label htmlFor={name}>{getLabel(name)}</label>
      <input
        id={name}
        value={value}
        onChange={(e) => {
          store.setState((state) => ({ ...state, [name]: e.target.value }));
        }}
      />
    </fieldset>
  );
}

function Name({ label }: { label: Fields }) {
  const value = useStore((state) => state[label]);
  return (
    <div className="name">
      <span>{getLabel(label)}: </span>
      <span>
        <b>{value}</b>
      </span>
    </div>
  );
}

function createStore(initialValue) {
  let state = initialValue;
  const subscribers = new Set();

  return {
    getState: () => state,
    setState: (fn) => {
      const nextState = fn(state);
      state = nextState;
      // @ts-ignore
      subscribers.forEach((fn) => fn(state));
    },
    subcribe: (fn) => {
      subscribers.add(fn);
      console.log(subscribers);

      return () => {
        subscribers.delete(fn);
      };
    },
  };
}

const store = createStore({
  firstName: "Girish",
  lastName: "V",
});

const useStore = (select) => {
  return React.useSyncExternalStore(store.subcribe, () =>
    select(store.getState())
  );
};

function Header() {
  return <h1>Header</h1>;
}

function App() {
  return (
    <main>
      <Header />
      <Input name="firstName" />
      <Input name="lastName" />
      <Name label="firstName" />
      <Name label="lastName" />
    </main>
  );
}

function getLabel(label: string) {
  const matches = /(\w+)(?=[A-Z])(.+)/g.exec(label);
  if (!matches || matches.length < 3) {
    return label;
  }

  return `${matches[1]} ${matches[2]}`;
}

type Store = {
  firstName: string;
  lastName: string;
};

type Fields = keyof Store;

export default App;
