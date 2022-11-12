import * as React from "react";

function Cell({
  count,
  id,
  onClick,
}: Cell & { onClick: (id: number) => void }) {
  return <button onClick={() => onClick(id)}>{count}</button>;
}

function App() {
  const [state, setState] = React.useState<Cell[]>(
    Array.from({ length: 80 }, (_, i) => i).map((i) => ({ count: 0, id: i }))
  );

  const clickHandler = React.useCallback((id: number) => {
    setState((state) => {
      const index = state.findIndex((cell) => cell.id === id);
      return [
        ...state.slice(0, index),
        { ...state[index], count: state[index].count + 1 },
        ...state.slice(index + 1),
      ];
    });
  }, []);

  return (
    <main>
      <div id="grid">
        {state.map((cell) => (
          <Cell key={cell.id} onClick={clickHandler} {...cell} />
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
