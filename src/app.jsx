import { signal } from "@preact/signals";
import { createContext } from "preact";
import { memo, useState } from "preact/compat";

const signalCount = signal(0);
const StateContext = createContext(null);

export function App() {
  const [stateCount, setStateCount] = useState(0);
  
  return (
    <StateContext.Provider value={{ stateCount, setStateCount }}>
      <div className="app">
        <h1>Signals vs useState Demo</h1>
        
        {/* State Example */}
        <div className="demo-section">
          <h2>useState Example</h2>
          <ExpensiveTreeState count={stateCount} />
          <button onClick={() => setStateCount(c => c + 1)}>
            Increment State ({stateCount})
          </button>
        </div>

        {/* Signal Example */}
        <div className="demo-section">
          <h2>Signal Example</h2>
          <ExpensiveTreeSignal />
          <button onClick={() => signalCount.value++}>
            Increment Signal ({signalCount.value})
          </button>
        </div>
      </div>
    </StateContext.Provider>
  );
}

// USE STATE

const ExpensiveTreeState = memo(({ count }) => {
  console.log("ExpensiveTreeState rendered");
  return (
    <div className="tree">
      <ExpensiveComponentState count={count} />
      <ExpensiveComponentState count={count} />
      <ExpensiveComponentState count={count} />
    </div>
  );
});

const ExpensiveComponentState = ({count}) => {
  console.log("ExpensiveComponentState rendered");
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
  }
  return <div className="expensive">Expensive Component {count}</div>;
};

// USE SIGNAL

const ExpensiveTreeSignal = memo(() => {
  console.log("ExpensiveTreeSignal rendered");
  return (
    <div className="tree">
      <ExpensiveComponentSignal />
      <ExpensiveComponentSignal />
      <ExpensiveComponentSignal />
    </div>
  );
});

const ExpensiveComponentSignal = () => {
  console.log("ExpensiveComponentSignal rendered");
  return <div className="expensive">Expensive Component {signalCount.value}</div>;
};