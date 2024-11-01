import {Field} from "../types/FormTypesDynamic";

const useValidationDynamic = () => {
  const validateField = (field: Field) => {
    let error = '';

    if (field.required && !field.value.trim()) {
      error = `${field.label} is required`;
    } else if (
      field.input_type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)
    ) {
      error = `${field.label} is invalid`;
    }

    return error;
  };

  const validateFields = (fields: Field[]) => {
    const errors = new Map<string, string>();

    fields.forEach(field => {
      const error = validateField(field);

      if (error) {
        errors.set(field.id, error);
      }
    });

    return errors;
  }

  return {
    validateField,
    validateFields
  };
};

export default useValidationDynamic;
