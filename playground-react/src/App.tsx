import React from 'react';
import './App.css';
import {useUIContext} from "./contexts/UIContext";
import Sample from "./components/Sample/Sample";

function App() {
  const uiContext = useUIContext();

  console.log('context usage in the App component: ', uiContext.theme);

  return (
    <div className="App">
      <div>React Playground</div>
      <Sample/>
    </div>
  );
}

export default App;
