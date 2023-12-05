import React, { useCallback, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import QuizAnswers from "./QuizAnswers/QuizAnswers";

interface QuizPageProps {
  cyclePage: () => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ cyclePage }) => {
  const { quizDatas, score } = useAppSelector((state) => state.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < quizDatas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      cyclePage();
    }
  }, [currentQuestion]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col justify-between items-center bg-gray-200 rounded-lg w-[80%] h-[80%] shadow-2xl px-8 py-6">
        <h1 className="text-3xl font-bold">Quiz {currentQuestion + 1}</h1>
        <div className="flex justify-between items-center block gap-8">
          <h1 className="text-xl font-bold w-[50%] text-center">
            {quizDatas[currentQuestion].question}
          </h1>
          <h1 className="text-xl font-bold w-[50%]">
            <QuizAnswers
              answers={quizDatas[currentQuestion].answers}
              correctAnswer={quizDatas[currentQuestion].correct_answer}
              onAnswer={handleNextQuestion}
            />
          </h1>
        </div>
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
};

export default QuizPage;
