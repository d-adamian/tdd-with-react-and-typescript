import type { Book } from "./types";
import { useEffect, useState } from "react";

import axios from "axios";

const SERVER_URL = "http://localhost:8079";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setError(false);
      setLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/books`);
        setBooks(response.data as Book[]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    void fetchBooks();
  }, []);

  return { books, loading, error };
};
