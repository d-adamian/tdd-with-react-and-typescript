import { useBook } from "./useBook";

export const BookDetailContainer = () => {
  const { book, loading, error } = useBook();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="book-detail">
      <h2 className="book-title" data-testid="book-title">
        {book && book.name}
      </h2>
    </div>
  );
};
