import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">📚</span>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Library Management
              </span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link to="/" className={navLinkClass("/")}>
              Books
            </Link>
            <Link to="/authors" className={navLinkClass("/authors")}>
              Authors
            </Link>
            <Link to="/genres" className={navLinkClass("/genres")}>
              Genres
            </Link>
            <Link to="/loans" className={navLinkClass("/loans")}>
              Loans
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
