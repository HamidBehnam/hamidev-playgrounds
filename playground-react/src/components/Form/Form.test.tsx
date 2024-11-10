import {fireEvent, render, screen} from "@testing-library/react";
import Form from "./Form";
import {FormProvider} from "../../contexts/FormContext";

test('renders form elements properly', () => {
  render(
    <FormProvider>
      <Form />
    </FormProvider>
  );

  const ageInput = screen.getByTestId(/test-age$/i);
  expect(ageInput).toBeInTheDocument();
});

test('renders form elements properly', () => {
  render(
    <FormProvider>
      <Form />
    </FormProvider>
  );

  const submitButton = screen.getByRole('button', {name: /submit/i});
  expect(submitButton).toBeInTheDocument();

  fireEvent.click(submitButton);

  const validationMessage = screen.getAllByText(/required/i);
  expect(validationMessage.length).toBeGreaterThan(0);
});

test('render departure field if age is greater than 20', () => {
  render(
    <FormProvider>
      <Form />
    </FormProvider>
  );

  const ageInput = screen.getByTestId(/test-age$/i);
  const departureInput = screen.queryByTestId(/-test-departure$/i);

  expect(departureInput).not.toBeInTheDocument();

  fireEvent.change(ageInput, {target: {value: 21}});

  const departureInputTryAgain = screen.getByTestId(/-test-departure$/i);

  expect(departureInputTryAgain).toBeInTheDocument();
});
