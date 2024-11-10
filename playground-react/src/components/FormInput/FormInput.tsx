import {ChangeEvent, FC} from "react";
import ValidationMessage from "../ValidationMessage/ValidationMessage";

interface FormInputProps {
  name: string;
  id: string;
  value: string | number;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled: boolean;
  hasError: boolean;
  required: boolean;
  errorMessage?: string;
  checked?: boolean;
  dataTestId?: string;
}

const FormInput: FC<FormInputProps> = ({name, id, value, type, onChange, label, disabled, hasError, required, errorMessage, checked, dataTestId}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        aria-invalid={hasError}
        aria-required={required}
        aria-describedby={id + 'inputError'}
        data-testid={dataTestId}
      />
      {hasError && <ValidationMessage id={id + 'inputError'} message={errorMessage!} />}
    </>
  );
};

export default FormInput;
