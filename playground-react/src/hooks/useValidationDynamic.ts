import {useCallback, useState} from "react";
import {Field, FormState, ValidationMode} from "../types/FormTypesDynamic";

const useValidationDynamic = (state: FormState, touched: Set<string>)
  : [Map<string, string>, (validationMode: ValidationMode) => boolean] => {
  const [errors, setErrors] = useState(new Map<string, string>());

  const validateForm = useCallback((validationMode: ValidationMode = ValidationMode.TOUCHED): boolean => {
    let isValid = true;

    let validationFields = [];

    let newErrors = new Map<string, string>(errors);

    switch (validationMode) {
      case ValidationMode.TOUCHED:
        validationFields = state.fields.filter(field => touched.has(field.id));
        break;
      case ValidationMode.STEP:
        validationFields = state.fields.filter(field => field.step === state.currentStep);
        break;
      case ValidationMode.THOROUGH:
        validationFields = state.fields;
        break;
    }

    validationFields.forEach(field => {
      if (field.required && !field.value.trim()) {
        isValid = false;
        newErrors.set(field.id, `${field.label} is required`);
      } else if (
        field.input_type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)
      ) {
        isValid = false;
        newErrors.set(field.id, `${field.label} is invalid`);
      } else {
        newErrors.delete(field.id);
      }
    });

    setErrors(newErrors);

    return isValid;
  }, [state, touched]);

  return [errors, validateForm];
};

export default useValidationDynamic;
