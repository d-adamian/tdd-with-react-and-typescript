import type { Book } from "./types";

interface BookListProps {
  books: Book[];
}

export const BookList = ({ books }: BookListProps) => (
  <div data-testid="book-list">
    {books.map(({ id, name }) => (
      <div className="book-item" data-testid="book-item" key={id}>
        <h2 className="title">{name}</h2>
        <a href={`/books/${id}`}>View Details</a>
      </div>
    ))}
  </div>
);
