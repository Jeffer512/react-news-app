import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useNewsFilters } from "../context/NewsContext";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  
  // Grab the theme logic and the reset logic from Context
  const { isDark, toggleDarkMode, updateFilters, resetFilters } = useNewsFilters();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters({uiPage: 1})
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleHomeClick = () => {
    setQuery(""); // Clear the local search input
    resetFilters(); // Clear global categories/dates
  };

  return (
    <div className="nav-content">
      <Link to="/" onClick={handleHomeClick} className="home-link">NewsExplorer</Link>

      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search news..."
        />
        <button type="submit">Search</button>
      </form>

      <button onClick={toggleDarkMode} className="theme-btn">
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default SearchBar;