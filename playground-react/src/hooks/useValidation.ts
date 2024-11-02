const useValidation = () => {
  const validateField = (name: string, value: string) => {
    let error = '';

    if (!value) {
      error = `${name} is required.`
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Email is not valid'
    }

    return error;
  };

  const validateFields = (fields: {name: string, value: string}[]) => {
    const errors = new Map<string, string>();

    for (let {name, value} of fields) {
      const error = validateField(name, value);

      if (error) {
        errors.set(name, error);
      }
    }

    return errors;
  };

  return {
    validateField,
    validateFields
  };
};

export default useValidation;
