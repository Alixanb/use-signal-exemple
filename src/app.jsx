import { signal } from "@preact/signals";
import { createContext } from "preact";
import React, { memo, useState } from "preact/compat";
import Schema from "../schema.png";

const signalCount = signal(0);
const StateContext = createContext(null);


export function App() {
  const [stateCount, setStateCount] = useState(0);
  
  return (
      <StateContext.Provider value={{ stateCount, setStateCount }}>
        <h1>Signals vs useState Demo</h1>
      <img src={Schema} alt="schema" style={{ margin: "auto", width: "50%"}} />
        <div className="app">
          
          {/* State Example */}
          <div className="demo-section">
            <h2>useState Example</h2>
            <ExpensiveTreeState count={stateCount} />
            <button onClick={() => setStateCount(c => c + 1)}>
              Increment State ({stateCount})
            </button>
            <br />
            <span> ~3x50ms + 200ms</span>
          </div>

          {/* Signal Example */}
          <div className="demo-section">
            <h2>Signal Example</h2>
            <ExpensiveTreeSignal />
            <button onClick={() => signalCount.value++}>
              Increment Signal ({signalCount.value})
            </button>
            <br />
            <span>~3x50ms</span>
          </div>
        </div>
      </StateContext.Provider>
  );
}

// USE STATE

const ExpensiveTreeState = memo(({ count }) => {
  console.log("ExpensiveTreeState rendered");
  const startTime = performance.now();
  while (performance.now() - startTime < 200) {
  }
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
  while (performance.now() - startTime < 50) {
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
  const startTime = performance.now();
  while (performance.now() - startTime < 50) {
  }
  return <div className="expensive">Expensive Component {signalCount.value}</div>;
};