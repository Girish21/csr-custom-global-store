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
      <label htmlFor={name}>{getLabel(name)}</label>
      <input id={name} value={value} onChange={onChange} />
    </fieldset>
  );
}

function Name({ value, label }: { value: string; label: Fields }) {
  return (
    <div className="name">
      <span>{getLabel(label)}: </span>
      <span>
        <b>{value}</b>
      </span>
    </div>
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
      <Name label="firstName" value={state.firstName} />
      <Name label="lastName" value={state.lastName} />
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
