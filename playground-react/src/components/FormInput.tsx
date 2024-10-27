import {ChangeEvent, FC, useId} from "react";
import ValidationErrorMessage from "./ValidationErrorMessage";

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  required?: boolean;
  hasError: boolean;
  errorMessage?: string;
  label: string;
  disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({id, value, type, onChange, name, required, hasError, errorMessage, label, autoFocus, disabled}) => {
  const uniqueId = useId();
  return (
    <>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        disabled={disabled}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={uniqueId + 'inputError'}
      />
      {hasError && <ValidationErrorMessage id={uniqueId + 'inputError'} errorMessage={errorMessage!} />}
    </>
  )
};

export default FormInput;
