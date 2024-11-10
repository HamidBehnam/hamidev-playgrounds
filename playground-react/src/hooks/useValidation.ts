import {z} from "zod";

const useValidation = () => {
  const nameSchema = z.string().min(1, {message: 'Name is required'}).regex(/^[a-zA-Z0-9]+$/, {message: 'Name should contain only letters and numbers'});
  const emailSchema = z.string().email({ message: 'Email is invalid' });
  const messageSchema = z.string().min(1, {message: 'Message is required'});
  const ageSchema = z.number().min(1, {message: 'Age is required'}).refine(value => value >= 18, {message: 'Age should be at least 18'});
  const departureSchema = z.string().min(1, {message: 'Created At is required'}).refine(value => Date.parse(value) >= new Date().getTime(), {message: 'Departure should be anytime after today'});
  const arrivalSchema = z.string().min(1, {message: 'Modified At is required'}).refine(value => Date.parse(value) >= new Date().getTime(), {message: 'Departure should be anytime after today'});
  const passwordSchema = z.string().min(8, {message: 'Password should be at least 8 characters'});
  const departureArrivalSchema = z.object({
    departure: departureSchema,
    arrival: arrivalSchema,
  })
    .refine(value => Date.parse(value.arrival) >= Date.parse(value.departure), {message: 'Arrival should be after Departure', path: ['arrival']})
    .refine(value => Date.parse(value.arrival) - Date.parse(value.departure) >= 24 * 60 * 60 * 1000, {message: 'Arrival should be at least 24 hours after Departure', path: ['arrival']});
  const acceptSchema = z.boolean().refine(value => value, {message: 'Acceptance is required'});
  const tagsSchema = z.string().array().nonempty({message: 'Select at least one'});
  const radioSchema = z.string().refine(value => value !== '', {message: 'Select one'});
  const optionSchema = z.string().refine(value => value !== '', {message: 'Select one'});

  const formDataSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    message: messageSchema,
    age: ageSchema,
    departure: departureSchema,
    arrival: arrivalSchema,
    password: passwordSchema,
    accept: acceptSchema,
    tags: tagsSchema,
    radio: radioSchema,
    option: optionSchema,
  });

  const validateField = (name: string, value: string | number | boolean | string[]) => {
    let result;

    switch (name) {
      case 'name':
        result = nameSchema.safeParse(value);
        break;
      case 'email':
        result = emailSchema.safeParse(value);
        break;
      case 'message':
        result = messageSchema.safeParse(value);
        break;
      case 'age':
        result = ageSchema.safeParse(value);
        break;
      case 'departure':
        result = departureSchema.safeParse(value);
        break;
      case 'arrival':
        result = arrivalSchema.safeParse(value);
        break;
      case 'password':
        result = passwordSchema.safeParse(value);
        break;
      case 'accept':
        result = acceptSchema.safeParse(value);
        break;
      case 'tags':
        result = tagsSchema.safeParse(value);
        break;
      case 'radio':
        result = radioSchema.safeParse(value);
        break;
      case 'option':
        result = optionSchema.safeParse(value);
        break
      default:
        result = z.string().safeParse(value);
    }

    return result.success ? '' : result.error.errors[0].message;
  };

  const validateFields = (fields: {name: string; value: string | number | boolean | string[]}[]) => {
    const errors = new Map<string, string>();

    fields.forEach(field => {
      const error = validateField(field.name, field.value);

      if (error) {
        errors.set(field.name, error);
      }
    });

    return errors;
  }

  const validateDepartureArrival = (departure: string, arrival: string) => {
    const errors = new Map<string, string>();
    const result = departureArrivalSchema.safeParse({departure, arrival});

    if (!result.success) {
      result.error.errors.forEach((error) => {
        errors.set(error.path.join('.'), error.message);
      });
    }

    return errors;
  };

  const validateFieldsAllAtOnce = (formData: FormData) => {
    const errors = new Map<string, string>();

    const result = formDataSchema.safeParse(formData);

    if (!result.success) {

      for (let error of result.error.errors) {
        errors.set(error.path.join('.'), error.message);
      }
    }

    return errors;
  };

  return {validateFields, validateDepartureArrival};
};

export default useValidation;
