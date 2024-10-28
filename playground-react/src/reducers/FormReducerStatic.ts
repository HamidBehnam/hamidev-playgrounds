import {Action, State} from "../types/FormTypesStatic";
import {initialFormData} from "../constants/FormConstantsStatic";

export const formReducerStatic = (state: State, action: Action) => {
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
        error: null
      };
    case 'SUBMIT_FORM_SUCCESS':
      return {
        ...state,
        isLoading: false,
        success: true,
        step: 1,
        formData: initialFormData
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
