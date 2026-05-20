import { BookList } from "./BookList";
import { useBooks } from "./useBooks";
import { SearchBox } from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { fetchBooks } from "../redux/bookListSlice";
import { useEffect } from "react";

export const BookListContainer = () => {
  const { searchTerm, setSearchTerm } = useBooks();

  const { books } = useSelector((state: RootState) => ({
    books: state.bookList.books,
  }));

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchBooks(""));
  }, [dispatch]);

  return (
    <>
      <SearchBox term={searchTerm} onSearch={setSearchTerm} />
      <BookList books={books} />
    </>
  );
};
