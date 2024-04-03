// hooks/useFetchBooks.js

import { useState, useEffect } from 'react';
import { fetchBooks } from '../api/books';

const useFetchBooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setError(null);
      setBooks(data.data); // Update to set the books state with data.data
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Cleanup function to cancel any ongoing fetch operation
    return () => {
      // Cancel fetch operation if needed
    };
  }, []);

  return { loading, error, books, fetchData }; // Return fetchData function as well
};

export default useFetchBooks;
