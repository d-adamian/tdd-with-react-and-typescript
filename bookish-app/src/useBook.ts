import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { type Book } from "./types.ts";
import { SERVER_URL } from "./server.ts";

import axios from "axios";

export const useBook = () => {
  const { id } = useParams<string>();

  const [book, setBook] = useState<Book | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${SERVER_URL}/books/${id}`);
        setBook(response.data as Book);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    void fetchBook();
  }, [id]);

  return { book, loading, error };
};
