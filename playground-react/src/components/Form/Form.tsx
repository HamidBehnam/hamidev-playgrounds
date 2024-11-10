import {useFormContext} from "../../contexts/FormContext";
import {ChangeEvent, FormEvent, useEffect, useId, useState} from "react";
import styles from "./Form.module.css";
import FormInput from "../FormInput/FormInput";
import FormTextArea from "../FormTextArea/FormTextArea";
import useValidation from "../../hooks/useValidation";
import useDebounce from "../../hooks/useDebounce";
import SubmissionMessage from "../SubmissionMessage/SubmissionMessage";
import useStrengthDetector, {PasswordStrength} from "../../hooks/useStrengthDetector";
import ValidationMessage from "../ValidationMessage/ValidationMessage";
import {FormData} from "../../contexts/FormContext";
import useFetch from "../../hooks/useFetch";

const Form = () => {
  const {state, dispatch} = useFormContext();
  const [errors, setErrors] = useState(new Map<string, string>());
  const uniqueId = useId();
  const {validateFields, validateDepartureArrival} = useValidation();
  const [touched, setTouched] = useState(new Set<string>());
  const debouncedFormData = useDebounce(state.formData, 800);
  const debouncedPassword = useDebounce(state.formData.password, 800);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const strengthDetector = useStrengthDetector();
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
  const [formIsTouched, setFormIsTouched] = useState(false);
  const fetchApi = useFetch();

  const tags = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
  ];
  const radios = [
    'Radio 1',
    'Radio 2',
    'Radio 3',
  ];
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
  ];

  const fields = [
    {name: 'name', value: state.formData.name},
    {name: 'email', value: state.formData.email},
    {name: 'message', value: state.formData.message},
    {name: 'age', value: state.formData.age},
    {name: 'departure', value: state.formData.departure},
    {name: 'arrival', value: state.formData.arrival},
    {name: 'password', value: state.formData.password},
    {name: 'accept', value: state.formData.accept},
    {name: 'tags', value: state.formData.tags},
    {name: 'radio', value: state.formData.radio},
    {name: 'option', value: state.formData.option},
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
    const savedFormDataStr = localStorage.getItem('formData');

    if (savedFormDataStr) {
      const formData: FormData = JSON.parse(savedFormDataStr);

      for (let [name, value] of Object.entries(formData)) {
        dispatch({type: 'SET_FORM_DATA', payload: {name, value}});
      }
    }
  }, []);

  const runValidation = () => {
    const newErrors = validateFields(fields.filter(field => touched.has(field.name)));
    setErrors(newErrors);
  };

  useEffect(() => {
    runValidation();

    if (formIsTouched) {
      localStorage.setItem('formData', JSON.stringify(debouncedFormData));
    }

  }, [debouncedFormData]);

  useEffect(() => {
    if (debouncedPassword.length === 0) {
      setPasswordStrengthMessage('');
      return;
    } else {
      const strength = strengthDetector(debouncedPassword);
      switch (strength) {
        case PasswordStrength.Weak:
          setPasswordStrengthMessage('Weak');
          break;
        case PasswordStrength.Medium:
          setPasswordStrengthMessage('Medium');
          break;
        case PasswordStrength.Strong:
          setPasswordStrengthMessage('Strong');
          break;
        default:
          setPasswordStrengthMessage('');
      }
    }
  }, [debouncedPassword]);

  const resetForm = () => {
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'name', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'email', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'message', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'age', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'departure', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'arrival', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'password', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'accept', value: false}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'tags', value: []}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'radio', value: ''}});
    dispatch({type: 'SET_FORM_DATA', payload: {name: 'option', value: ''}});
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setFormIsTouched(true);

    if (!touched.has(name)) {
      setTouched(new Set(touched).add(name));
    }

    if (name === 'age') {
      dispatch({type: 'SET_FORM_DATA', payload: {name, value: parseInt(value)}});
    } else if (name === 'accept' && event.target instanceof HTMLInputElement) {
      dispatch({type: 'SET_FORM_DATA', payload: {name, value: event.target.checked}});
    } else if (name === 'tags' && event.target instanceof HTMLInputElement) {
      if (event.target.checked) {
        dispatch({type: 'SET_FORM_DATA', payload: {name, value: [...state.formData.tags, value]}});
      } else {
        dispatch({type: 'SET_FORM_DATA', payload: {name, value: state.formData.tags.filter(tag => tag !== value)}});
      }
    } else {
      dispatch({type: 'SET_FORM_DATA', payload: {name, value}});
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmissionMessage('');
    setTouched(new Set(fields.map(field => field.name)));
    const errors = validateFields(fields.filter(field => {
      if (field.name === 'departure' || field.name === 'arrival') {
        return state.formData.age >= 20;
      }

      return true;
    }));

    if (state.formData.age >= 20) {
      const departureArrivalErrors = validateDepartureArrival(state.formData.departure, state.formData.arrival);
      departureArrivalErrors.forEach((value, key) => {
        errors.set(key, value);
      });
    }

    setErrors(errors);

    if (errors.size === 0) {
      dispatch({type: 'SUBMIT_FORM'});

      // Simulate API call
      try {
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        dispatch({type: 'SUBMIT_FORM_SUCCESS'});
        dispatch({type: 'ADD_FORM_DATA', payload: state.formData});
        localStorage.removeItem('formData');
        setSubmissionMessage('Form submitted successfully');
        resetForm();
        setTouched(new Set<string>());
      } catch (error) {
        dispatch({type: 'SUBMIT_FORM_ERROR', payload: 'An error occurred'});
        setSubmissionMessage('An error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <FormInput
          name={'name'}
          id={uniqueId + 'name'}
          value={state.formData.name}
          type={'text'}
          onChange={handleChange}
          label={'Name'}
          disabled={state.isLoading}
          hasError={errors.has('name')}
          required={true}
          errorMessage={errors.get('name')}
        />
      </div>
      <div className={styles.formGroup}>
        <FormInput
          name={'email'}
          id={uniqueId + 'email'}
          value={state.formData.email}
          type={'email'}
          onChange={handleChange}
          label={'Email'}
          disabled={state.isLoading}
          hasError={errors.has('email')}
          required={true}
          errorMessage={errors.get('email')}
        />
      </div>
      <div className={styles.formGroup}>
        <FormInput
          name={'age'}
          id={uniqueId + 'age'}
          value={state.formData.age}
          type={'number'}
          onChange={handleChange}
          label={'Age'}
          disabled={state.isLoading}
          hasError={errors.has('age')}
          required={true}
          errorMessage={errors.get('age')}
          dataTestId={`${uniqueId}-test-age`}
        />
      </div>
      {state.formData.age >= 20 && (
        <>
          <div className={styles.formGroup}>
            <FormInput
              name={'departure'}
              id={uniqueId + 'departure'}
              value={state.formData.departure}
              type={'datetime-local'}
              onChange={handleChange}
              label={'Departure'}
              disabled={state.isLoading}
              hasError={errors.has('departure')}
              required={true}
              dataTestId={`${uniqueId}-test-departure`}
              errorMessage={errors.get('departure')}
            />
          </div>
          <div className={styles.formGroup}>
            <FormInput
              name={'arrival'}
              id={uniqueId + 'arrival'}
              value={state.formData.arrival}
              type={'datetime-local'}
              onChange={handleChange}
              label={'Arrival'}
              disabled={state.isLoading}
              hasError={errors.has('arrival')}
              required={true}
              errorMessage={errors.get('arrival')}
            />
          </div>
        </>
      )}
      <div className={styles.formGroup}>
        <FormTextArea
          name={'message'}
          id={uniqueId + 'message'}
          value={state.formData.message}
          onChange={handleChange}
          label={'Message'}
          disabled={state.isLoading}
          hasError={errors.has('message')}
          required={true}
          errorMessage={errors.get('message')}
        />
      </div>
      <div className={styles.formGroup}>
        <FormInput
          name={'password'}
          id={uniqueId + 'password'}
          value={state.formData.password}
          type={'password'}
          onChange={handleChange}
          label={'Password'}
          disabled={state.isLoading}
          hasError={errors.has('password')}
          required={true}
          errorMessage={errors.get('password')}
        />
        {passwordStrengthMessage && <pre>{passwordStrengthMessage} Password</pre>}
      </div>
      <div className={styles.formGroup}>
        <div>
          <FormInput
            name={'accept'}
            id={uniqueId + 'accept'}
            value={'accept'}
            type={'checkbox'}
            onChange={handleChange}
            label={'Accept Terms'}
            disabled={state.isLoading}
            checked={state.formData.accept}
            hasError={errors.has('accept')}
            required={true}
            errorMessage={errors.get('accept')}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <div>
          {tags.map((tag, index) => (
            <div>
              <FormInput
                name={'tags'}
                id={uniqueId + tag}
                value={tag}
                type={'checkbox'}
                onChange={handleChange}
                label={tag}
                disabled={state.isLoading}
                hasError={errors.has('tags')}
                checked={state.formData.tags.includes(tag)}
                required={true}
                errorMessage={errors.get('tags')}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <div>
          {radios.map((radio, index) => (
            <div>
              <FormInput
                name={'radio'}
                id={uniqueId + radio}
                value={radio}
                type={'radio'}
                onChange={handleChange}
                label={radio}
                checked={state.formData.radio === radio}
                disabled={state.isLoading}
                hasError={errors.has('radio')}
                required={true}
                errorMessage={errors.get('radio')}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <div>
          <select value={state.formData.option} disabled={state.isLoading} name={'option'} onChange={event => handleChange(event)}>
            <option value={''}>Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          {errors.has('option') && <ValidationMessage message={errors.get('option')!} id={''} />}
        </div>
      </div>

      <div className={styles.formGroup}>
        <button type={'submit'}>Submit</button>
      </div>

      {state.isLoading && <div>Loading...</div>}

      {submissionMessage && (
        <div className={styles.formGroup}>
          < SubmissionMessage success={state.success} message={submissionMessage}/>
        </div>
      )}

      <pre>Note: If age greater than or equal to 20, then you can select and validate Departure and Arrival dates.</pre>

      <ul>
        {state.formDataItems.map((item, index) => (
          <li key={index}>{item.name} - {item.age}</li>
        ))}
      </ul>
    </form>
  );
};

export default Form;
