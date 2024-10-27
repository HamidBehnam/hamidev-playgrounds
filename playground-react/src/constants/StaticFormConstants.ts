import { FormData, State } from '../types/StaticFormTypes';

export const initialFormData: FormData = {
  name: '',
  email: '',
  message: ''
};

export const initialState: State = {
  formData: initialFormData,
  isLoading: false,
  success: false,
  error: null
};
