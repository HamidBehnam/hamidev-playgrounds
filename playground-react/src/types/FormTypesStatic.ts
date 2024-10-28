export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface State {
  formData: FormData,
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

// todo: extract the action types to a separate file: Action = | Action1 | Action2 | Action3
export type Action =
  | { type: 'SET_FORM_DATA'; payload: { name: string; value: string; }; }
  | { type: 'SUBMIT_FORM'; }
  | { type: 'SUBMIT_FORM_SUCCESS'; }
  | { type: 'SUBMIT_FORM_ERROR'; payload: string; }
