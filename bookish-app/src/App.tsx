import { Typography } from "@mui/material";
import { BookListContainer } from "./BookListContainer";
import { BookDetailContainer } from "./BookDetailContainer";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Typography variant="h2" component="h2" data-testid="heading">
        Bookish
      </Typography>
      <Routes>
        <Route path="/" element={<BookListContainer />} />
        <Route path="/books/:id" element={<BookDetailContainer />} />
      </Routes>
    </>
  );
};
