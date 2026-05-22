import type { Book } from "../types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../server.ts";

import axios from "axios";

type AppStateType = {
  books: Book[];
  loading: boolean;
  error: boolean;
  term: string;
};

const initialState: AppStateType = {
  books: [],
  loading: false,
  error: false,
  term: "",
};

export const fetchBooks = createAsyncThunk<Book[], string>(
  "books/search",
  async (term: string = "") => {
    const response = await axios.get(`${SERVER_URL}/books?q=${term}&_sort=id`);
    return response.data as Book[];
  }
);

export const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    setTerm: (state: AppStateType, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchBooks.fulfilled,
      (state: AppStateType, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
        state.loading = false;
      }
    );

    builder.addCase(fetchBooks.pending, (state: AppStateType) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.rejected, (state: AppStateType) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { setTerm } = bookListSlice.actions;

export default bookListSlice.reducer;
