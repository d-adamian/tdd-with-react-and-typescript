import { BookList } from "./BookList";
import { SearchBox } from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { fetchBooks } from "../redux/bookListSlice";
import { useEffect } from "react";

export const BookListContainer = () => {
  const books = useSelector((state: RootState) => state.bookList.books);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(fetchBooks(""));
  }, [dispatch]);

  return (
    <>
      <SearchBox />
      <BookList books={books} />
    </>
  );
};
