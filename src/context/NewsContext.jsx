import { createContext, useState, useContext } from 'react';

const NewsContext = createContext();

/**
 * Provide global state management for news filters and pagination.
 * This ensures search criteria and the current page persist during navigation
 * and allow for atomic updates to prevent redundant API calls.
 */
export const NewsProvider = ({ children }) => {
  const initialState = {
    categoryUri: [],
    categoryOper: "or",
    articlesSortBy: "date",
    articlesSortByAsc: false,
    dateStart: "",
    dateEnd: "",
    uiPage: 1,
  };

  const [filters, setFilters] = useState(initialState);

  /**
   * Update specific filter properties.
   * Reset uiPage to 1 automatically when search criteria change to ensure 
   * the user starts from the beginning of the new result set.
   */
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      uiPage: newFilters.uiPage !== undefined ? newFilters.uiPage : 1,
    }));
  };

  /**
   * Revert all filters and pagination to the initial state.
   */
  const resetFilters = () => setFilters(initialState);

  return (
    <NewsContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </NewsContext.Provider>
  );
};

/**
 * Access the news filter context. 
 * Throw an error if accessed outside of the NewsProvider to ensure data integrity.
 */
export const useNewsFilters = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsFilters must be used within a NewsProvider");
  }
  return context;
};