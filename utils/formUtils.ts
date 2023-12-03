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

export const useFormInput = (
  initialFormInput: FormInput,
  validateInput: (name: string, value: string) => string
) => {
  const [formInput, setFormInput] = useState<FormInput>(initialFormInput);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      const validatedValue = validateInput ? validateInput(name, value) : value;
      setFormInput((prevFormInput) => ({
        ...prevFormInput,
        [name]: validatedValue,
      }));
    },
    []
  );

  return { formInput, handleInputChange };
};
