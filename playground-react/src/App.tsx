import React from 'react';
import './App.css';
import FormStatic from "./components/FormStatic";
import FormDynamic from "./components/FormDynamic";

function App() {
  return (
    <div className="App">
      <FormStatic />
      <hr />
      <FormDynamic />
    </div>
  );
}

export default App;
