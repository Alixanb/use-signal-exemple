import { signal } from "@preact/signals";
import { createContext } from "preact";
import { memo, useState } from "preact/compat";
import { getRandomColor } from "./utils";

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
          <ExpensiveTree count={stateCount} />
          <button onClick={() => setStateCount(c => c + 1)}>
            Increment State ({stateCount})
          </button>
        </div>

        {/* Signal Example */}
        <div className="demo-section">
          <h2>Signal Example</h2>
          <ExpensiveTree />
          <button onClick={() => signalCount.value++}>
            Increment Signal ({signalCount.value})
          </button>
          <SignalDisplay />
        </div>
      </div>
    </StateContext.Provider>
  );
}

const ExpensiveTree = memo(({ count }) => {
  console.log("ExpensiveTree rendered");
  return (
    <div className="tree">
      <ExpensiveComponent />
      <ExpensiveComponent />
      <ExpensiveComponent />
    </div>
  );
});

const ExpensiveComponent = () => {
  console.log("ExpensiveComponent rendered");
  const startTime = performance.now();
  while (performance.now() - startTime < 100) {
  }
  return <div className="expensive">Expensive Component</div>;
};

const SignalDisplay = () => {
  return <div>Signal Value: {signalCount}</div>;
};

const Container = ({children}) => {
  const color = getRandomColor();
  console.log("Container rendered with color:", color);
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    setRenders(prev => prev + 1);
  }, [children]);

  return (
    <div className="container" style={{backgroundColor: color}}>
      Number of renders: {renders}
      <div className="container">
      {children}
      </div>
    </div>
  )
}