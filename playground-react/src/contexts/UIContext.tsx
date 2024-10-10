import {createContext, FC, ReactNode, useContext, useState} from "react";

interface UIContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUIContext = () => {
  const uiContext = useContext(UIContext);

  if (!uiContext) {
    throw new Error('useUIContext must be used within a UIProvider');
  }

  return uiContext;
};

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: FC<UIProviderProps> = ({children}) => {
  const [theme, setTheme] = useState('light');

  return (
    <UIContext.Provider value={{theme, setTheme}}>
      {children}
    </UIContext.Provider>
  );
};
