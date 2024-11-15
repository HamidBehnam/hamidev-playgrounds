import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
}

export default App;
