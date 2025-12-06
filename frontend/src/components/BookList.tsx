import { Book } from "../types/models";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
  onDelete?: (id: number) => void;
}

const BookList = ({ books, onDelete }: BookListProps) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No books found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BookList;
