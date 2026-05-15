import { BookList } from "./BookList";
import { useBooks } from "./useBooks";

export const BookListContainer = () => {
  const { loading, error, books } = useBooks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching books</div>;
  }

  return <BookList books={books} />;
};
