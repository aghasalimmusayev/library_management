import { useState, useEffect } from "react";
import { loansApi, booksApi } from "../services/api";
import { Loan, Book } from "../types/models";
import LoanList from "../components/LoanList";

const LoansPage = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [bookId, setBookId] = useState<number | "">("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchLoans();
    fetchBooks();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await loansApi.getAll();
      setLoans(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch loans");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await booksApi.getAll();
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId || !userName || !userEmail || !dueDate) {
      setError("All fields are required");
      return;
    }

    try {
      await loansApi.create({
        book_id: Number(bookId),
        user_name: userName,
        user_email: userEmail,
        due_date: dueDate,
      });
      setBookId("");
      setUserName("");
      setUserEmail("");
      setDueDate("");
      setShowForm(false);
      fetchLoans();
    } catch (err) {
      setError("Failed to create loan");
      console.error(err);
    }
  };

  const handleReturn = async (id: number) => {
    try {
      await loansApi.returnLoan(id);
      fetchLoans();
    } catch (err) {
      setError("Failed to return loan");
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) return;

    try {
      await loansApi.delete(id);
      setLoans(loans.filter((loan) => loan.id !== id));
    } catch (err) {
      setError("Failed to delete loan");
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
        <h1 className="text-3xl font-bold text-gray-900">Loans</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ Create Loan"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create New Loan</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book *
                </label>
                <select
                  value={bookId}
                  onChange={(e) => setBookId(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a book</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Name *
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Borrower name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Create Loan
            </button>
          </form>
        </div>
      )}

      <LoanList loans={loans} onReturn={handleReturn} onDelete={handleDelete} />
    </div>
  );
};

export default LoansPage;
