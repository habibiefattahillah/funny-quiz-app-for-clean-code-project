import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setScore } from "@/lib/features/quiz/quizSlice";

interface ResultPageProps {
  cyclePage: () => void;
}

const ResultPage = ({ cyclePage }: ResultPageProps) => {
  const { score } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  const handlePlayAgain = () => {
    dispatch(setScore(0));
    cyclePage();
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col justify-between items-center bg-gray-200 rounded-lg w-[80%] h-[80%] shadow-2xl px-24 py-6">
        <h1 className="text-3xl font-bold">Your Score</h1>
        <h1 className="text-3xl font-bold">{score}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
