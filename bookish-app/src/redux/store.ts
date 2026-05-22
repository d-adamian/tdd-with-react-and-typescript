import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from "./bookListSlice";
import bookDetailReducer from "./bookDetailSlice";

export const store = configureStore({
  reducer: {
    bookList: bookListReducer,
    bookDetail: bookDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
