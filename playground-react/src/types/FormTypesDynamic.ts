export interface Field {
  id: string;
  name: string;
  value: string;
  step: number;
  input_type: string;
  field_type: string;
  label: string;
  required?: boolean;
}

export interface FormState {
  fields: Field[];
  currentStep: number;
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

export type FormAction =
  | { type: 'SET_FIELDS'; payload: Field[]; }
  | { type: 'SUBMIT_FORM'; }
  | { type: 'SUBMIT_FORM_SUCCESS'; }
  | { type: 'SUBMIT_FORM_ERROR'; payload: string; }
