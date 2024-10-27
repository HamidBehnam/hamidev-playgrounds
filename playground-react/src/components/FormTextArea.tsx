import {ChangeEvent, useId} from "react";
import ValidationErrorMessage from "./ValidationErrorMessage";

interface FormTextAreaProps {
  id: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  hasError: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

export default function FormTextArea({id, value, onChange, name, label, required, hasError, errorMessage, disabled}: FormTextAreaProps) {
  const uniqueId = useId();

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={uniqueId + 'textAreaError'}
      ></textarea>
      {hasError && <ValidationErrorMessage id={uniqueId + 'textAreaError'} errorMessage={errorMessage!} />}
    </>
  );
}
