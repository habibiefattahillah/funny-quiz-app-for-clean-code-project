"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import QuizForm from "@/components/Form/QuizForm";
import QuizPage from "@/components/Quiz/QuizPage";
import ResultPage from "@/components/Result/ResultPage";
import { setPage } from "@/lib/features/page/pageSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.page);

  const pageCycle = {
    form: "quiz",
    quiz: "result",
    result: "form",
  };

  const cyclePage = () => {
    dispatch(setPage(pageCycle[page]));
  };

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-white text-black">
      {page === "form" && (
        <>
          <h1 className="text-3xl font-bold">Pop Quiz !</h1>
          <QuizForm cyclePage={() => cyclePage()} />
          <p className="font-semibold">
            Achmad Habibie Fattahillah - 3121600018
          </p>
          <p>With Open Triviata Database API</p>
        </>
      )}
      {page === "quiz" && <QuizPage cyclePage={() => cyclePage()} />}
      {page === "result" && <ResultPage cyclePage={() => cyclePage()} />}
    </main>
  );
}
