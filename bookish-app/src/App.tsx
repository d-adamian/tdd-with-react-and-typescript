import { Typography } from "@mui/material";
import { BookList } from "./BookList";
import type { Book } from "./types";
import { useEffect, useState } from "react";

import axios from "axios";

const SERVER_URL = "http://localhost:8079";

export const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get(`${SERVER_URL}/books`).then((res) => setBooks(res.data));
  }, []);

  return (
    <>
      <Typography variant="h2" component="h2" data-testid="heading">
        Bookish
      </Typography>
      <BookList books={books} />
    </>
  );
};
