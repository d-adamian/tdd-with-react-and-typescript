import { type Book } from "../types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBookDetails } from "../redux/bookDetailSlice";
import { addReview } from "../redux/bookReviewSlice";
import { type AppDispatch } from "../redux/store";
import { TextField, Button } from "@mui/material";

export const ReviewForm = ({ book }: { book: Book }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = () => {
    void dispatch(addReview({ id: book.id, name, content }));
    void dispatch(fetchBookDetails(book.id.toString()));
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="name"
        slotProps={{
          htmlInput: {
            "data-testid": "review-name",
          },
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="content"
        slotProps={{
          htmlInput: {
            "data-testid": "review-content",
          },
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button data-testid="review-submit" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};
