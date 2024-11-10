import React from 'react';
import './App.css';
import Form from "./components/Form/Form";
import {FormProvider} from "./contexts/FormContext";
import FormDataList from "./components/FormDataList/FormDataList";

function App() {
  return (
    <div className="App">
      <FormProvider>
        <FormDataList />
        <Form />
      </FormProvider>
    </div>
  );
}

export default App;
