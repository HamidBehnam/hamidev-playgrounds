import {ChangeEvent, FC, FormEvent, useReducer, useState} from "react";
import styles from "./SampleForm.module.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface State {
  formData: FormData,
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: ''
};

const initialState: State = {
  formData: initialFormData,
  isLoading: false,
  success: false,
  error: null
};

// todo: extract the action types to a separate file: Action = | Action1 | Action2 | Action3
type Action =
  | { type: 'SET_FORM_DATA'; payload: { name: string; value: string; }; }
  | { type: 'SUBMIT_FORM'; }
  | { type: 'SUBMIT_FORM_SUCCESS'; }
  | { type: 'SUBMIT_FORM_ERROR'; payload: string; };


const reducer = (state: State, action: Action) => {
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

const SampleForm: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    let isValid = true;

    const newErrors: { [key: string]: string } = {};

    if (!state.formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!state.formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(state.formData.email)) { // update this based on the requirements o exclude the spacial characters
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!state.formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch({ type: 'SET_FORM_DATA', payload: { name, value } });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch({ type: 'SUBMIT_FORM' });

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        dispatch({ type: 'SUBMIT_FORM_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'SUBMIT_FORM_ERROR', payload: 'An error occurred' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor={'name'}>Name</label>
        <input
          type={'text'}
          id={'name'}
          name={'name'}
          value={state.formData.name}
          onChange={handleChange}
          aria-required={true}
          aria-invalid={!!errors.name}
          aria-describedby={'nameError'}
        />
        <div id={'nameError'} className={styles.error}>{errors.name}</div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor={'email'}>Email</label>
        <input
          type={'email'}
          id={'email'}
          name={'email'}
          value={state.formData.email}
          onChange={handleChange}
          aria-required={true}
          aria-invalid={!!errors.email}
          aria-describedby={'emailError'}
        />
        <div id={'emailError'} className={styles.error}>{errors.email}</div>
      </div>
      <div className={styles.forGroup}>
        <label htmlFor={'message'}>Message</label>
        <textarea
          id={'message'}
          name={'message'}
          value={state.formData.message}
          onChange={handleChange}
          aria-required={true}
          aria-invalid={!!errors.message}
          aria-describedby={'messageError'}
        ></textarea>
        <div id={'messageError'} className={styles.error}>{errors.message}</div>

        <button
          type={'submit'}
          disabled={state.isLoading}
          className={styles.submitButton}
        >
          {state.isLoading ? 'Submitting...' : 'Submit'}
        </button>
        {state.success && <div className={styles.success}>Form submitted successfully</div>}
        {state.error && <div className={styles.error}>{state.error}</div>}
      </div>
    </form>
  );
}

export default SampleForm;
