import { Author } from "../types/models";

interface AuthorListProps {
  authors: Author[];
  onDelete?: (id: number) => void;
}

const AuthorList = ({ authors, onDelete }: AuthorListProps) => {
  if (authors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No authors found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <div
          key={author.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-800">{author.name}</h3>
            {author.birth_year && (
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                b. {author.birth_year}
              </span>
            )}
          </div>

          {author.bio && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {author.bio}
            </p>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(author.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors w-full"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuthorList;
