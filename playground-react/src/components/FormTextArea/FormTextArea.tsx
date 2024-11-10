import {ChangeEvent, FC} from "react";
import ValidationMessage from "../ValidationMessage/ValidationMessage";

interface FormTextAreaProps {
  name: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  disabled: boolean;
  hasError: boolean;
  errorMessage?: string;
  required: boolean;
}

const FormTextArea: FC<FormTextAreaProps> = ({id, name, value, onChange, required, hasError, errorMessage, label, disabled}) => {
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
        aria-describedby={id + 'inputError'}
      />
      {hasError && <ValidationMessage id={id + 'error'} message={errorMessage!} />}
    </>
  );
};

export default FormTextArea;
