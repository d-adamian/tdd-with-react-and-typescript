import { createAsyncThunk } from "@reduxjs/toolkit";
import { type Review } from "../types";
import axios from "axios";
import { SERVER_URL } from "../server";

type AddReviewRequest = {
  id: number;
  name: string;
  content: string;
};

export const addReview = createAsyncThunk<Review, AddReviewRequest>(
  "reviews/addReview",
  async ({ id, name, content }: AddReviewRequest) => {
    const response = await axios.post(`${SERVER_URL}/books/${id}/reviews`, {
      name,
      content,
    });
    return response.data as Review;
  }
);
