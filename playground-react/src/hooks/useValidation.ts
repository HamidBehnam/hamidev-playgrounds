import {useCallback, useState} from "react";
import {FormData} from "../types/StaticFormTypes";

const useValidation = (formData: FormData, touched: Set<string>)
  : [Map<string, string>, (thoroughValidation?: boolean) => boolean] => {
  const [errors, setErrors] = useState(new Map<string, string>());

  const validateForm = useCallback((thoroughValidation = false): boolean => {
    let isValid = true;

    const newErrors = new Map<string, string>();

    if (thoroughValidation || touched.has('name')) {
      if (!formData.name.trim()) {
        newErrors.set('name', 'Name is required');
        isValid = false;
      }
    }

    if (thoroughValidation || touched.has('email')) {
      if (!formData.email.trim()) {
        newErrors.set('email', 'Email is required');
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) { // update this based on the requirements to exclude the spacial characters
        newErrors.set('email', 'Email is invalid');
        isValid = false;
      }
    }

    if (thoroughValidation || touched.has('message')) {
      if (!formData.message.trim()) {
        newErrors.set('message', 'Message is required');
        isValid = false;
      }
    }

    setErrors(newErrors);

    return isValid;
  }, [formData, touched]);

  return [errors, validateForm];
};

export default useValidation;
