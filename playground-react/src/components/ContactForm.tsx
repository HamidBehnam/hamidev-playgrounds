import {FC, useReducer, useId, ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {initialState} from '../constants/ContactForm';
import contactFormReducer from '../reducers/ContactFormReducer';
import styles from './ContactForm.module.css';
import FormInput from "./FormInput";
import useValidation from '../hooks/useValidation';
import useDebounce from "../hooks/useDebouncer";
import {ContactFormData} from "../types/ContactForm";
import useFetch from "../hooks/useFetch";

/**
 * Planning:
 * - state management: reducer
 * - work on the template and form elements
 * - validation
 * - debounce
 * - edge cases: reset the form after successful submission
 * - edge case: handle multi click on the submit btn while the submission is in progress
 * */

const ContactForm: FC = () => {
  const [state, dispatch] = useReducer(contactFormReducer, initialState);
  const {validateField, validateFields} = useValidation();
  const [errors, setErrors] = useState(new Map<string, string>());
  const debouncedFormData = useDebounce(state.contactFormData, 1000);
  const [touched, setTouched] = useState(new Set<string>());
  const [formIsTouched, setFormIsTouched] = useState(false);
  const fetchApi = useFetch();
  const uniqueId = useId();

  const fields = [
    {name: 'firstName', value: state.contactFormData.firstName},
    {name: 'lastName', value: state.contactFormData.lastName},
    {name: 'email', value: state.contactFormData.email},
    {name: 'message', value: state.contactFormData.message},
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const {signal} = abortController;

    fetchApi('https://jsonplaceholder.typicode.com/posts', {signal})
      .then(data => console.log(data))
      .catch(error => console.log(error));

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const savedFormDateStr = localStorage.getItem('contactFormData');

    if (savedFormDateStr) {
      const formData: ContactFormData = JSON.parse(savedFormDateStr);

      for (let [name, value] of Object.entries(formData)) {
        dispatch({type: 'SET_FORM_DATA', payload: {name, value}});
      }
    }
  }, []);

  const runValidation = () => {
    const errors = validateFields(fields.filter(field => touched.has(field.name)))
    setErrors(errors);
  };

  useEffect(() => {
    runValidation();

    if (formIsTouched) {
      localStorage.setItem('contactFormData', JSON.stringify(debouncedFormData));
    }

  }, [debouncedFormData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    if (!touched.has(name)) {
      setTouched(new Set(touched).add(name));
    }

    setFormIsTouched(true);

    dispatch({type: 'SET_FORM_DATA', payload: {name, value}});
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const errors = validateFields(fields);
    setErrors(errors);

    if (errors.size === 0) {
      dispatch({type: 'SUBMIT_FORM'});

      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => resolve('success'), 3000);
        });
        dispatch({type: 'SUBMIT_FORM_SUCCESS'});
        setTouched(new Set());
      } catch (error) {
        dispatch({type: 'SUBMIT_FORM_ERROR', payload: 'Error in submitting the form.'});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <FormInput
          id={uniqueId + 'firstName'}
          type={'text'} name={'firstName'}
          value={state.contactFormData.firstName}
          label={'First name'}
          required={true}
          hasError={errors.has('firstName')}
          errorMessage={errors.get('firstName')}
          disabled={state.isLoading}
          autoFocus={true}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <FormInput
          id={uniqueId + 'lastName'}
          type={'text'} name={'lastName'}
          value={state.contactFormData.lastName}
          label={'Last name'}
          onChange={handleChange}
          required={true}
          hasError={errors.has('lastName')}
          errorMessage={errors.get('lastName')}
          disabled={state.isLoading}
          autoFocus={false}
        />
      </div>
      <div className={styles.formGroup}>
        <FormInput
          id={uniqueId + 'email'}
          type={'email'} name={'email'}
          value={state.contactFormData.email}
          label={'Email'}
          onChange={handleChange}
          required={true}
          hasError={errors.has('email')}
          errorMessage={errors.get('email')}
          disabled={state.isLoading}
          autoFocus={false}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor={uniqueId + 'firstName'}>Message</label>
        <textarea
          name={'message'}
          id={uniqueId + 'message'}
          value={state.contactFormData.message}
          onChange={handleChange}
          disabled={state.isLoading}
          aria-describedby={uniqueId + 'message'}
          aria-invalid={errors.has('message')}
          aria-required={true}
        ></textarea>
        {errors.has('message') && <div id={uniqueId + 'message'}>{errors.get('message')}</div>}
      </div>

      <button type={'submit'}>Submit</button>
    </form>
  );
};

export default ContactForm;
