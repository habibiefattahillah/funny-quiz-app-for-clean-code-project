import axios, { AxiosResponse } from "axios";
import he from "he";
import { useAppDispatch } from "@/lib/hooks";
import { setQuizDatas } from "@/lib/features/quiz/quizSlice";

interface QuizData {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export const useQuizGenerator = () => {
  const dispatch = useAppDispatch();

  const API_URL = "https://opentdb.com/api.php?";

  const processParams = (params: Record<number, string>) => {
    const props = Object.fromEntries(
      Object.entries(params).map(([key, value]) => {
        if (value === "any") return [key, undefined];
        else return [key, value];
      })
    );
    return props;
  };

  const generateUrl = (paramsObj: Record<string, string | undefined>) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(paramsObj)) {
      if (value !== undefined) params.append(key, value);
    }

    return `${API_URL}${params.toString()}`;
  };

  const fetchQuizDatas = async (url: string): Promise<QuizData[]> => {
    const response: AxiosResponse<{ results: QuizData[] }> = await axios.get(
      url
    );
    return response.data.results;
  };

  const decodeString = (str: string) => {
    return he.decode(str);
  };

  const decodeQuizDatas = (quizDatas: QuizData[]): QuizData[] => {
    return quizDatas.map((quizData) => {
      return {
        ...quizData,
        question: decodeString(quizData.question),
        correct_answer: decodeString(quizData.correct_answer),
        incorrect_answers: quizData.incorrect_answers.map((answer) =>
          decodeString(answer)
        ),
      };
    });
  };

  const generateQuiz = async (paramsObj: Record<number, string>) => {
    try {
      const processedParams = processParams(paramsObj);
      const url = generateUrl(processedParams);
      const quizDatas = await fetchQuizDatas(url);
      const decodedQuizDatas = decodeQuizDatas(quizDatas);

      dispatch(setQuizDatas(decodedQuizDatas));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return generateQuiz;
};
