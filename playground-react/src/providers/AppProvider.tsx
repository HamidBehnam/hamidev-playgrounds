import {createContext, FC, ReactNode, useContext, useState} from "react";

interface AppContextType {
  theme: string;
  currentlyWatching: string;
  setTheme: (theme: string) => void;
  setCurrentlyWatching: (currentlyWatching: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({children}) => {
  const [theme, setTheme] = useState("light");
  const [currentlyWatching, setCurrentlyWatching] = useState("");

  return (
    <AppContext.Provider value={{theme, setTheme, currentlyWatching, setCurrentlyWatching}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return appContext;
};
