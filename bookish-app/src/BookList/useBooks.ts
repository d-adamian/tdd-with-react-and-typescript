import type { Book } from "../types";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../server.ts";

import axios from "axios";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBooks = async (term: string) => {
      setError(false);
      setLoading(true);
      try {
        const response = await axios.get(
          `${SERVER_URL}/books?q=${term}&_sort=id`
        );
        setBooks(response.data as Book[]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    void fetchBooks(searchTerm);
  }, [searchTerm]);

  return { books, loading, error, searchTerm, setSearchTerm };
};
