import { Genre } from "../types/models";

interface GenreListProps {
  genres: Genre[];
  onDelete?: (id: number) => void;
}

const GenreList = ({ genres, onDelete }: GenreListProps) => {
  if (genres.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No genres found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">{genre.name}</h3>

          {genre.description && (
            <p className="text-sm text-gray-600 mb-4">{genre.description}</p>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(genre.id)}
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

export default GenreList;
