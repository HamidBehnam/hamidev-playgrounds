import {FormState} from "../types/FormTypesDynamic";

export const formInitialState: FormState = {
  fields: [],
  currentStep: 1,
  isLoading: false,
  success: false,
  error: null
}
