/* Filters.jsx */
import { useState } from "react";
import { useNewsFilters } from "../context/NewsContext";

function Filters() {
  const { filters, updateFilters, resetFilters } = useNewsFilters();
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const thirtyOneDaysAgo = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const categories = [
    { name: "Business", uri: "news/Business" },
    { name: "Politics", uri: "news/Politics" },
    { name: "Tech", uri: "news/Technology" },
    { name: "Environment", uri: "news/Environment" },
    { name: "Health", uri: "news/Health" },
    { name: "Science", uri: "news/Science" },
    { name: "Sports", uri: "news/Sports" },
    { name: "Arts & Entertainment", uri: "news/Arts_and_Entertainment" },
  ];

  const handleCategoryChange = (uri) => {
    const current = filters.categoryUri;
    const next = current.includes(uri)
      ? current.filter((item) => item !== uri)
      : [...current, uri];
    updateFilters({ categoryUri: next });
  };

  return (
    <div className="filters-container">
      {/* Main Toggle Button */}
      <button className="main-toggle" onClick={() => setIsMainOpen(!isMainOpen)}>
        Filters {isMainOpen ? "▲" : "▼"}
      </button>

      {isMainOpen && (
        <div className="dropdown-menu">
          {/* Category Section */}
          <div className="dropdown-item">
            <button 
              className="submenu-toggle" 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              Categories {isCategoryOpen ? "▲" : "▶"}
            </button>
            
            {isCategoryOpen && (
              <div className="category-submenu">
                {categories.map((cat) => (
                  <label key={cat.uri} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.categoryUri.includes(cat.uri)}
                      onChange={() => handleCategoryChange(cat.uri)}
                    />
                    {cat.name}
                  </label>
                ))}
                
              </div>
              
            )}
            {isCategoryOpen && (
              <button className="reset-btn" onClick={(e) => updateFilters({ categoryUri: [] })}>Reset</button>
            )}
          </div>

          {/* Date Section */}
          <div className="dropdown-item date-section">
            <h4>Date Range</h4>
            <div className="date-input-wrapper">
              <input
                type="date"
                min={thirtyOneDaysAgo}
                max={filters.dateEnd || today}
                value={filters.dateStart}
                onChange={(e) => updateFilters({ dateStart: e.target.value })}
              />
            </div>
            <div className="date-input-wrapper">
              <input
                type="date"
                min={filters.dateStart || thirtyOneDaysAgo}
                max={today}
                value={filters.dateEnd}
                onChange={(e) => updateFilters({ dateEnd: e.target.value })}
              />
            </div>
            <button className="reset-btn" onClick={(e) => updateFilters({ dateEnd: "", dateStart: "" })}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;