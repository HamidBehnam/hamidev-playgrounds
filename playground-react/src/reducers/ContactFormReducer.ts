import {ContactFormState, ContactFormAction} from '../types/ContactForm';
import {initialFormData} from "../constants/ContactForm";

const contactFormReducer = (state: ContactFormState, action: ContactFormAction): ContactFormState => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        contactFormData: {
          ...state.contactFormData,
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
        contactFormData: initialFormData,
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

export default contactFormReducer;
