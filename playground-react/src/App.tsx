import React from 'react';
import './App.css';
import UsersList from "./components/UsersList/UsersList";
import {FilterBar} from "./components/FilterBar/FilterBar";

function App() {
  return (
    <div className="App">
      <FilterBar />
      <UsersList />
    </div>
  );
}

export default App;
