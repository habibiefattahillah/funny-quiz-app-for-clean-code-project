import { configureStore } from "@reduxjs/toolkit";
import { quizSlice } from "./features/quiz/quizSlice";
import { pageSlice } from "./features/page/pageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      quiz: quizSlice.reducer,
      page: pageSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
