import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useReducer, useState} from "react";
import dynamicFormReducer from "../reducers/FormReducerDynamic";
import {formInitialState} from "../constants/FormConstantsDynamic";
import {Field, ValidationMode} from "../types/FormTypesDynamic";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import styles from "./FormStatic.module.css";
import useDebounce from "../hooks/useDebounce";
import useValidationDynamic from "../hooks/useValidationDynamic";


const FormDynamic: FC = () => {
  const [state, dispatch] = useReducer(dynamicFormReducer, formInitialState);
  const [touched, setTouched] = useState(new Set<string>());
  const formDebounceSignal = useDebounce<Field[]>(state.fields, 300);
  const [errors, validateForm] = useValidationDynamic(state, touched);

  useEffect(() => {
    const data: Field[] = [
      { id: '1', name: 'first_name', value: '', step: 1, input_type: 'text', field_type: 'form-input', label: 'First Name', required: true },
      { id: '2', name: 'last_name', value: '', step: 1, input_type: 'text', field_type: 'form-input', label: 'Last Name', required: true },
      { id: '3', name: 'email', value: '', step: 2, input_type: 'email', field_type: 'form-input', label: 'Email', required: true },
      { id: '4', name: 'message', value: '', step: 2, input_type: 'text', field_type: 'form-textarea', label: 'Message', required: true },
    ];

    dispatch({ type: 'SET_FIELDS', payload: data });
  }, []);

  useEffect(() => {
    validateForm(ValidationMode.TOUCHED);
  }, [formDebounceSignal]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: Field) => {
    const { value } = event.target;

    if (!touched.has(field.id)) {
      setTouched(new Set(touched).add(field.id));
    }

    dispatch({ type: 'SET_FIELDS', payload: state.fields.map(f => f.id === field.id ? { ...f, value } : f) });
  }, [state.fields, touched]);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm(ValidationMode.THOROUGH)) {
      dispatch({ type: 'SUBMIT_FORM' });

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        dispatch({ type: 'SUBMIT_FORM_SUCCESS' });
        dispatch({ type: 'SET_FIELDS', payload: state.fields.map(f => ({ ...f, value: '' })) });
        setTouched(new Set<string>());
      } catch (error) {
        dispatch({ type: 'SUBMIT_FORM_ERROR', payload: 'An error occurred' });
      }
    }
  }, [validateForm]);

  return (
    <>
      <h1>{state.fields.length}</h1>
      <form onSubmit={handleSubmit}>
        {state.fields.map((field, index) => {
          switch (field.field_type) {
            case 'form-input':
              return (
                <div key = {field.id}>
                  <FormInput
                    type={field.input_type}
                    id={field.id}
                    name={field.name}
                    value={field.value}
                    onChange={event => handleChange(event, field)}
                    autoFocus={index === 0}
                    required={field.required}
                    disabled={state.isLoading}
                    hasError={errors.has(field.id)}
                    errorMessage={errors.get(field.id)}
                    label={field.label}
                  />
                </div>
              );
            case 'form-textarea':
              return (
                <div key = {field.id}>
                  <FormTextArea
                    id={field.id}
                    value={field.value}
                    name={field.name}
                    onChange={event => handleChange(event, field)}
                    label={field.label}
                    required={field.required}
                    disabled={state.isLoading}
                    hasError={errors.has(field.id)}
                    errorMessage={errors.get(field.id)}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
        <button
          type={'submit'}
          disabled={state.isLoading}
          className={styles.submitButton}
        >
          {state.isLoading ? 'Submitting...' : 'Submit'}
        </button>

        {state.success && <div className={styles.success} role={'alert'}>Form submitted successfully</div>}
        {state.error && <div className={styles.error} role={'status'}>{state.error}</div>}
      </form>
    </>
  );
};

export default FormDynamic;
