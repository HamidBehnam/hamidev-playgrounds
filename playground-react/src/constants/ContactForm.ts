import {ContactFormState, ContactFormData} from '../types/ContactForm';

export const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  message: ''
}

export const initialState: ContactFormState = {
  contactFormData: initialFormData,
  isLoading: false,
  success: false,
  error: null,
};
