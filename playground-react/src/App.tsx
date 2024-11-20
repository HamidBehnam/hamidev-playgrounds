import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {AppProvider} from "./providers/AppProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// singleton instance of QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className={'flex min-h-full'}>
          <Sidebar />
          <div className={'flex flex-col flex-1'}>
            <Header />
            <Content />
            <Footer />
          </div>
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
