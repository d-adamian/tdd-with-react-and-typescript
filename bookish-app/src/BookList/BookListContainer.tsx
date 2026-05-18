import { BookList } from "./BookList";
import { useBooks } from "./useBooks";
import { SearchBox } from "./SearchBox";

export const BookListContainer = () => {
  const { loading, error, books, searchTerm, setSearchTerm } = useBooks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching books</div>;
  }

  return (
    <>
      <SearchBox term={searchTerm} onSearch={setSearchTerm} />
      <BookList books={books} />
    </>
  );
};
