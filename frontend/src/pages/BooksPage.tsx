import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { booksApi } from "../services/api";
import { Book } from "../types/models";
import BookList from "../components/BookList";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await booksApi.getAll();
      setBooks(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await booksApi.delete(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Books</h1>
        <button
          onClick={() => navigate("/books/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          + Add Book
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default BooksPage;
