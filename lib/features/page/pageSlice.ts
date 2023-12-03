import { createSlice } from "@reduxjs/toolkit";

export interface PageState {
  page: "form" | "quiz" | "result";
}

const initialState: PageState = {
  page: "form",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;