import {useEffect, useReducer} from "react";

interface State {
  name: string;
  code: number;
}

interface ChangeNameAction {
  type: 'changeName';
  payload: string;
}

interface ChangeCodeAction {
  type: 'changeCode';
  payload: number;
}

interface ClearNameAction {
  type: 'clearName';
}

interface ClearCodeAction {
  type: 'clearCode';
}

type Action = 
  ChangeNameAction |
  ChangeCodeAction |
  ClearNameAction |
  ClearCodeAction;

export default function Sample() {
  const initialState: State = {
    name: 'hamid',
    code: 234
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'changeName':
        return {
          ...state,
          name: action.payload
        };
      case 'changeCode':
        return {
          ...state,
          code: action.payload
        };
      case 'clearName':
        return {
          ...state,
          name: ''
        };
      case 'clearCode':
        return {
          ...state,
          code: 0
        };
      default:
        return state;
    }
  };

  // TODO: Start with this line first and then write the reducer and initialState.
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timeout = setTimeout(() => {
      dispatch({
        type: 'changeName',
        payload: 'hamidbehnam'
      });
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div>{state.name}</div>
    </div>
  );
}
