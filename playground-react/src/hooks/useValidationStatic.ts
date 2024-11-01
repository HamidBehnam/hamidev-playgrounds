const useValidationStatic = () => {
  const validateField = (name: string, value: string) => {
    let error = '';

    if (!value.trim()) {
      error = 'Field is required';
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Email is invalid';
    }

    return error;
  };

  const validateFields = (fields: {name: string, value: string}[]) => {
    const errors = new Map<string, string>();

    fields.forEach(field => {
      const error = validateField(field.name, field.value);

      if (error) {
        errors.set(field.name, error);
      }
    });

    return errors;
  };

  return {
    validateField,
    validateFields,
  };
};

export default useValidationStatic;
