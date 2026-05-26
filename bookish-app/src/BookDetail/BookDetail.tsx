import { useState } from "react";
import { Button, TextField } from "@mui/material";
import type { Book } from "../types";
import { ReviewList } from "../ReviewList/ReviewList";

const getDescriptionFor = (book: Book) => {
  return book.description ? book.description : book.name;
};

export const BookDetail = ({ book }: { book: Book }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="detail">
      <h2 className="book-title" data-testid="book-title">
        {book.name}
      </h2>
      <p className="book-description" data-testid="book-description">
        {getDescriptionFor(book)}
      </p>

      <form noValidate autoComplete="off">
        <TextField
          id="name"
          data-testid="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="content"
          data-testid="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button data-testid="submit">Submit</Button>
      </form>

      {book.reviews && <ReviewList reviews={book.reviews} />}
    </div>
  );
};
