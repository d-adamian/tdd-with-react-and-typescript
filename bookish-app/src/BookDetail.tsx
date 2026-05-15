import type { Book } from "./types";

export const BookDetail = ({ book }: { book: Book }) => {
  return (
    <div className="detail">
      <h2 className="book-title" data-testid="book-title">
        {book.name}
      </h2>
      <p className="book-description">{book.description}</p>
    </div>
  );
};
