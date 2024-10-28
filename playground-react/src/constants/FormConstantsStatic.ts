import { FormData, State } from '../types/FormTypesStatic';

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
