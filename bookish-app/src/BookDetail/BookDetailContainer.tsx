import { useBook } from "./useBook";
import { BookDetail } from "./BookDetail";

export const BookDetailContainer = () => {
  const { book, loading, error } = useBook();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return book && <BookDetail book={book} />;
};
