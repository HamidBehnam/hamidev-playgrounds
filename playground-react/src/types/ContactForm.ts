export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  contactFormData: ContactFormData;
  isLoading: boolean;
  success: boolean;
  error: null | string;
}

export type ContactFormAction =
  | { type: 'SET_FORM_DATA', payload: { name: string, value: string } }
  | { type: 'SUBMIT_FORM'}
  | { type: 'SUBMIT_FORM_SUCCESS'}
  | { type: 'SUBMIT_FORM_ERROR', payload: string }
