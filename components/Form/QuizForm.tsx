import React, { useCallback } from "react";

import TextInput from "./FormInput/TextInput";
import DropdownInput from "./FormInput/DropdownInput";
import { useQuizGenerator } from "@/utils/quizUtils";
import { useFormInput, useFormSubmitValidation } from "@/utils/formUtils";
import {
  categoryList,
  difficultyList,
  typeList,
} from "@/constants/quizFormConstants";
import { validateAmount } from "./ValidationRules";

type QuizFormProps = {
  cyclePage: () => void;
};

const initialFormInput = {
  amount: "5",
  category: "any",
  difficulty: "any",
  type: "any",
};

const QuizForm = ({ cyclePage }: QuizFormProps) => {
  const generateQuiz = useQuizGenerator();
  const { validateFormSubmit, errorMessage } = useFormSubmitValidation();
  const rules = {
    amount: validateAmount,
  };

  const { formInput, handleInputChange } = useFormInput({
    initialFormInput,
    rules,
  });

  const errorMessages: { [key: string]: boolean } = {
    "Amount must be greater than 0": parseInt(formInput.amount) <= 0,
  };

  const handleQuizFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateFormSubmit(errorMessages)) return;

      await generateQuiz(formInput);

      cyclePage();
    },
    [formInput]
  );

  return (
    <form
      onSubmit={handleQuizFormSubmit}
      className="my-4 bg-gray-200 px-4 py-2 rounded-lg shadow-md"
    >
      <TextInput
        label="Number of Questions"
        name="amount"
        value={formInput.amount}
        onChange={handleInputChange}
        type="number"
      />
      <DropdownInput
        label="Category"
        name="category"
        value={formInput.category}
        onChange={handleInputChange}
        options={categoryList}
      />
      <DropdownInput
        label="Difficulty"
        name="difficulty"
        value={formInput.difficulty}
        onChange={handleInputChange}
        options={difficultyList}
      />
      <DropdownInput
        label="Type"
        name="type"
        value={formInput.type}
        onChange={handleInputChange}
        options={typeList}
      />
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Generate Quiz
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm ml-4">{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default QuizForm;
