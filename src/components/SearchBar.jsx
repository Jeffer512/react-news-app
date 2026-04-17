import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search news"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;