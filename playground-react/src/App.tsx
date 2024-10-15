import React from 'react';
import './App.css';
import Processor from "./components/Processor";
import Whatever from "./components/Whatever";

function App() {
  // TODO: render prop is similar to sending a function as a children. render prop seems to be more straightforward and more readable.
  const render = (name: string, code: number) => <Whatever {...{name, code}}/>;

  return (
    <div className="App">

      {/*TODO: Child of a component can be a function*/}
      <Processor render={render}>
        {(name, code) => <Whatever {...{name, code}}/>}
      </Processor>
      <hr />

      {/*TODO: Child of a component can be an array. This is a patter that you've already seen. Remember .map returns an array: theArray.map(item => <div>{item}</div>)*/}
      <Processor render={render}>
        {[<div>hey</div>, <div>hi</div>, <div>hello</div>, <Whatever name={'Me'} code={3} />]}
      </Processor>
      <hr />

      {/*TODO: Child of a component can be the child component itself*/}
      <Processor render={render}>
        <Processor render={render}>
          {<div>hey</div>}
        </Processor>
      </Processor>
    </div>
  );
}

export default App;

