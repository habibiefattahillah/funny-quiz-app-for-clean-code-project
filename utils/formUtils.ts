import { useState, useCallback } from "react";

export const useFormSubmitValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const generateErrorMessage = (errorMessages: { [key: string]: boolean }) => {
    return Object.keys(errorMessages).find((key) => errorMessages[key]);
  };

  const validateFormSubmit = (errorMessages: { [key: string]: boolean }) => {
    const errorMessage = generateErrorMessage(errorMessages);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(""), 3000);
      return false;
    }

    return true;
  };

  return { validateFormSubmit, errorMessage };
};

type FormInput = {
  [key: string]: string;
};

type ValidationRules = {
  [key: string]: (value: string) => string;
};

interface UseFormInputProps {
  initialFormInput?: FormInput;
  rules?: ValidationRules;
}

export const useFormInput = ({
  initialFormInput,
  rules,
}: UseFormInputProps) => {
  const [formInput, setFormInput] = useState<FormInput>(
    initialFormInput ? initialFormInput : {}
  );

  const validateInput = (
    name: string,
    value: string,
    rules: ValidationRules
  ) => {
    const validate = rules[name];
    if (validate) return validate(value);
    return value;
  };

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      const validatedValue = rules ? validateInput(name, value, rules) : value;
      setFormInput((prevFormInput) => ({
        ...prevFormInput,
        [name]: validatedValue,
      }));
    },
    []
  );

  return { formInput, handleInputChange };
};
