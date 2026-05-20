import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from "./bookListSlice";

export const store = configureStore({
  reducer: {
    bookList: bookListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
