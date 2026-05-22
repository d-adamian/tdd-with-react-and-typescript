import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Book } from "../types";
import { SERVER_URL } from "../server";

import axios from "axios";

export const fetchBookDetails = createAsyncThunk<Book, string>(
  "bookDetails/fetch",
  async (id: string) => {
    const response = await axios.get(`${SERVER_URL}/books/${id}`);
    return response.data as Book;
  }
);

type BookDetailType = {
  book: Book;
  loading: boolean;
  error: boolean;
};

const initialState: BookDetailType = {
  book: {
    id: 0,
    name: "",
  },
  loading: false,
  error: false,
};

const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchBookDetails.fulfilled, (state, action) => {
      state.book = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBookDetails.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default bookDetailsSlice.reducer;
