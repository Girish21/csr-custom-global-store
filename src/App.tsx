import * as React from "react";

function Input({
  name,
  onChange,
  value,
}: {
  name: Fields;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <fieldset>
      <label htmlFor={name}>{name}</label>
      <input id={name} value={value} onChange={onChange} />
    </fieldset>
  );
}

function App() {
  const [state, setState] = React.useState<Store>({
    firstName: "",
    lastName: "",
  });

  return (
    <main>
      <Input
        name="firstName"
        value={state["firstName"]}
        onChange={(e) =>
          setState((state) => ({ ...state, firstName: e.target.value }))
        }
      />
      <Input
        name="lastName"
        value={state["lastName"]}
        onChange={(e) =>
          setState((state) => ({ ...state, lastName: e.target.value }))
        }
      />
    </main>
  );
}

type Store = {
  firstName: string;
  lastName: string;
};

type Fields = keyof Store;

export default App;
