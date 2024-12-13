import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  FC,
  ReactNode,
} from "react";
import { Permission } from "../types";

export interface FilterData {
  term: string;
  inclusionType: 'INCLUDE' | 'EXCLUDE';
  includedPermissions: string[];
  excludedPermissions: string[];
}

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "SET_TERM":
      return {
        ...state,
        filterData: {
          ...state.filterData,
          term: action.payload,
        },
      };
    case "SET_INCLUSION":
      return {
        ...state,
        filterData: {
          ...state.filterData,
          inclusionType: action.payload,
        },
      };
    case "SET_INCLUDED_PERMISSIONS":
      return {
        ...state,
        filterData: {
          ...state.filterData,
          includedPermissions: action.payload
        }
      };
    case "SET_EXCLUDED_PERMISSIONS":
      return {
        ...state,
        filterData: {
          ...state.filterData,
          excludedPermissions: action.payload
        }
      };
    case "SET_USER_INTERVENED":
      return {
        ...state,
        userIntervened: action.payload
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        filterData: initialState.filterData,
        userIntervened: true
      };
    default:
      return state;
  }
};

const initialState: AppState = {
  filterData: {
    term: "",
    inclusionType: "INCLUDE",
    includedPermissions: ['manage', 'view', 'suspended'],
    excludedPermissions: []
  },
  userIntervened: false
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("AppContext must be accessed within an AppProvider");
  }

  return appContext;
};

interface AppState {
  filterData: FilterData;
  userIntervened: boolean;
}

type AppAction = 
  | { type: "SET_TERM"; payload: string }
  | { type: "SET_INCLUSION"; payload: 'INCLUDE' | 'EXCLUDE' }
  | { type: "SET_INCLUDED_PERMISSIONS"; payload: string[] }
  | { type: "SET_EXCLUDED_PERMISSIONS"; payload: string[] }
  | { type: "SET_USER_INTERVENED"; payload: boolean }
  | { type: "CLEAR_ALL_FILTERS"; }
