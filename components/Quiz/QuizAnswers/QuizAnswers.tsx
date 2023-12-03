import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setScore } from "@/lib/features/quiz/quizSlice";

import QuizAnswer from "./QuizAnswer";

interface QuizAnswersProps {
  answers: string[];
  correctAnswer: string;
  onAnswer: () => void;
}

const QuizAnswers = ({
  answers,
  correctAnswer,
  onAnswer,
}: QuizAnswersProps) => {
  const dispatch = useAppDispatch();
  const [isAnswered, setIsAnswered] = useState(false);
  const { score } = useAppSelector((state) => state.quiz);

  const handleAnswer = (answer: string) => {
    if (!isAnswered) {
      setIsAnswered(true);
      if (answer == correctAnswer && score !== undefined) {
        dispatch(setScore(score + 1));
      }
      setTimeout(() => {
        onAnswer();
        setIsAnswered(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {answers.map((answer, index) => (
        <QuizAnswer
          key={index}
          answer={answer}
          correctAnswer={correctAnswer}
          isAnswered={isAnswered}
          onAnswer={handleAnswer}
        />
      ))}
    </div>
  );
};

export default QuizAnswers;
