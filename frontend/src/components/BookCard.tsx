import { Book } from "../types/models";

interface BookCardProps {
  book: Book;
  onDelete?: (id: number) => void;
}

const BookCard = ({ book, onDelete }: BookCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
          <p className="text-sm text-gray-600">
            {book.genre_name || "Unknown Genre"}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {book.publication_year}
        </span>
      </div>

      {book.authors && book.authors.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Authors:</p>
          <div className="flex flex-wrap gap-2">
            {book.authors.map((author) => (
              <span
                key={author.id}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {author.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {onDelete && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onDelete(book.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
