import type { Book } from "./types";

interface BookListProps {
  books: Book[];
}

export const BookList = ({ books }: BookListProps) => (
  <div data-testid="book-list">
    {books.map(({ name }) => (
      <div className="book-item" data-testid="book-item" key={name}>
        <h2 className="title">{name}</h2>
      </div>
    ))}
  </div>
);
