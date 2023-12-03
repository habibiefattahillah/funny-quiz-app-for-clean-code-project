interface QuizAnswerProps {
  answer: string;
  correctAnswer: string;
  isAnswered: boolean;
  onAnswer: (answer: string) => void;
}

const QuizAnswer = ({
  answer,
  correctAnswer,
  isAnswered,
  onAnswer,
}: QuizAnswerProps) => {
  let color = "bg-white";
  if (isAnswered)
    answer == correctAnswer ? (color = "bg-green-400") : (color = "bg-red-400");

  return (
    <button
      className={`border border-black rounded-lg w-full py-3 ${color}`}
      onClick={() => onAnswer(answer)}
    >
      {answer}
    </button>
  );
};

export default QuizAnswer;
