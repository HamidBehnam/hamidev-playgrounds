import {FormAction, FormState} from "../types/FormTypesDynamic";

const formReducerDynamic = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_FIELDS':
      return {
        ...state,
        fields: action.payload
      };
    case 'SUBMIT_FORM':
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null
      };
    case 'SUBMIT_FORM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null
      };
    case 'SUBMIT_FORM_ERROR':
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default formReducerDynamic;
