import {createContext, Dispatch, FC, ReactNode, useContext, useReducer} from "react";

export interface FormData {
  name: string;
  email: string;
  message: string;
  age: number;
  departure: string;
  arrival: string;
  password: string;
  accept: boolean;
  tags: string[];
  radio: string;
  option: string;
}

interface FormState {
  formData: FormData;
  formDataItems: FormData[];
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

type FormAction =
  | { type: 'SET_FORM_DATA'; payload: {name: string; value: string | number | boolean | string[]} }
  | { type: 'SUBMIT_FORM' }
  | { type: 'SUBMIT_FORM_SUCCESS' }
  | { type: 'SUBMIT_FORM_ERROR'; payload: string }
  | { type: 'ADD_FORM_DATA'; payload: FormData };

interface FormContextType {
  state: FormState;
  dispatch: Dispatch<FormAction>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return formContext;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value
        }
      };
    case 'SUBMIT_FORM':
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case 'SUBMIT_FORM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case 'SUBMIT_FORM_ERROR':
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    case 'ADD_FORM_DATA':
      return {
        ...state,
        formDataItems: [...state.formDataItems, action.payload],
      };
    default:
      return state;
  }
}

const initialState: FormState = {
  formData: {
    name: '',
    email: '',
    message: '',
    age: 0,
    departure: '',
    arrival: '',
    password: '',
    accept: false,
    tags: [],
    radio: '',
    option: '',
  },
  formDataItems: [],
  isLoading: false,
  success: false,
  error: null,
};

interface FromProviderProps {
  children: ReactNode;
}

export const FormProvider: FC<FromProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{state, dispatch}}>
      {children}
    </FormContext.Provider>
  );
};
