import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useId, useReducer, useRef, useState} from "react";
import styles from "./FormStatic.module.css";
import useDebounce from "../hooks/useDebounce";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import useValidationStatic from "../hooks/useValidationStatic";
import {formReducerStatic} from "../reducers/FormReducerStatic";
import {initialState} from "../constants/FormConstantsStatic";
import {FormData} from "../types/FormTypesStatic";
import Loading from "./Loading";


const FormStatic: FC = () => {
  const [state, dispatch] = useReducer(formReducerStatic, initialState);
  const [touched, setTouched] = useState(new Set<string>());
  const debouncedFormData = useDebounce<FormData>(state.formData, 1000);
  const uniqueId = useId();
  const [errors, setErrors] = useState(new Map<string, string>());
  const {validateField, validateFields} = useValidationStatic();

  // creating this array is helpful for the validation process and for cases where you don't have an array of fields to loop through.
  const fields = [
    {name: 'name', value: state.formData.name},
    {name: 'email', value: state.formData.email},
    {name: 'message', value: state.formData.message},
  ];

  const runValidation = () => {
    const newErrors = validateFields(fields.filter(field => touched.has(field.name)));
    setErrors(newErrors);
  }

  useEffect(() => {
    runValidation();
  }, [debouncedFormData]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (!touched.has(name)) {
      setTouched(new Set(touched).add(name));
    }

    dispatch({ type: 'SET_FORM_DATA', payload: { name, value } });
  }, [touched]);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    setTouched(new Set(fields.map(field => field.name)));
    const errors = validateFields(fields);
    setErrors(errors);

    if (errors.size === 0) {
      dispatch({ type: 'SUBMIT_FORM' });

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        dispatch({ type: 'SUBMIT_FORM_SUCCESS' });
        setTouched(new Set<string>());
      } catch (error) {
        dispatch({ type: 'SUBMIT_FORM_ERROR', payload: 'An error occurred' });
      }
    }
  }, [state.formData]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <FormInput
          type={'text'}
          id={uniqueId + 'name'}
          name={'name'}
          value={state.formData.name}
          onChange={handleChange}
          autoFocus={true}
          required={true}
          disabled={state.isLoading}
          hasError={errors.has('name')}
          errorMessage={errors.get('name')}
          label={'Name'}
        />
      </div>
      <div className={styles.formGroup}>
        <FormInput
          type={'email'}
          id={uniqueId + 'email'}
          name={'email'}
          value={state.formData.email}
          onChange={handleChange}
          required={true}
          disabled={state.isLoading}
          hasError={errors.has('email')}
          errorMessage={errors.get('email')}
          label={'Email'}
        />
      </div>
      <div className={styles.forGroup}>
        <FormTextArea
          id={uniqueId + 'message'}
          value={state.formData.message}
          name={'message'}
          onChange={handleChange}
          label={'Message'}
          required={true}
          disabled={state.isLoading}
          hasError={errors.has('message')}
          errorMessage={errors.get('message')}
        />
      </div>

      <button
        type={'submit'}
        disabled={state.isLoading}
        className={styles.submitButton}
      >
        {state.isLoading ? 'Submitting...' : 'Submit'}
      </button>

      {state.isLoading && <Loading />}

      {state.success && <div className={styles.success} role={'alert'}>Form submitted successfully</div>}
      {state.error && <div className={styles.error} role={'status'}>{state.error}</div>}
    </form>
  );
}

export default FormStatic;
