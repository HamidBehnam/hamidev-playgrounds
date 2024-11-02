import {FC, ChangeEvent, useId} from 'react';
import ValidationErrorMessage from "./ValidationErrorMessage";

interface FormInputProps {
  id: string;
  type: string;
  name: string;
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  required: boolean;
  hasError: boolean;
  errorMessage?: string;
  disabled: boolean;
  autoFocus: boolean;
}

const FormInput: FC<FormInputProps> = ({id, name, type, value, label, onChange, required, hasError, errorMessage, disabled, autoFocus}) => {
  const uniqueId = useId();

  return (
    <>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        disabled={disabled}
        aria-describedby={uniqueId + name}
        aria-invalid={hasError}
        aria-required={required}
      />
      {hasError && <ValidationErrorMessage id={uniqueId + name} errorMessage={errorMessage}/>}
    </>
  );
};

export default FormInput;
