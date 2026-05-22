import { BookDetail } from "./BookDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchBookDetails } from "../redux/bookDetailSlice";

export const BookDetailContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id = "" } = useParams();

  const { book, loading, error } = useSelector(
    (state: RootState) => state.bookDetail
  );

  useEffect(() => {
    void dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return book && <BookDetail book={book} />;
};
