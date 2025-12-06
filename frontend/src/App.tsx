import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksPage from "./pages/BooksPage";
import CreateBookPage from "./pages/CreateBookPage";
import AuthorsPage from "./pages/AuthorsPage";
import GenresPage from "./pages/GenresPage";
import LoansPage from "./pages/LoansPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/books/create" element={<CreateBookPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/loans" element={<LoansPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
