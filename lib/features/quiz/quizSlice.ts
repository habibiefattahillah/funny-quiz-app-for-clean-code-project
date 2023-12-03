import { createSlice } from "@reduxjs/toolkit";

export interface QuizState {
  quizDatas: {
    type: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
  }[];
  score?: number;
}

const initialState: QuizState = {
  quizDatas: [],
  score: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizDatas: (state, action) => {
      state.quizDatas = action.payload;
      state.quizDatas.forEach((quiz) => {
        quiz.answers = [quiz.correct_answer, ...quiz.incorrect_answers];
        quiz.answers.sort(() => Math.random() - 0.5);
      });
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { setQuizDatas, setScore } = quizSlice.actions;
