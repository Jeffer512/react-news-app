import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api/NewsAPI";
import { useNewsFilters } from "../context/NewsContext";

/**
 * Synchronize URL parameters and global filters with the NewsAPI service.
 * Implement local pagination by slicing a cached batch of 100 articles 
 * to minimize network requests and optimize token usage.
 */
export const useNews = () => {
  const { keyword } = useParams();
  const { filters, updateFilters } = useNewsFilters();

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Map the 10-article UI pages to the 100-article API pages.
  const apiPage = Math.ceil(filters.uiPage / 10);

  useEffect(() => {
    // isActive: A flag to prevent "Race Conditions".
    // If the user changes filters rapidly, only update the state with the latest request.
    let isActive = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await getArticles({
          ...filters,
          keyword,
          articlesPage: apiPage,
        });
        if (isActive && response) {
          setApiData(results);
        }
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };

    // Exclude filters.uiPage from dependencies to prevent API calls on every page turn.
    // The effect only triggers when search criteria change or the 100-article boundary is crossed.
  }, [
    keyword,
    filters.categoryUri,
    filters.categoryOper,
    filters.articlesSortBy,
    filters.articlesSortByAsc,
    filters.dateStart,
    filters.dateEnd,
    apiPage,
  ]);

  const sliceStart = ((filters.uiPage - 1) % 10) * 10;
  const currentArticles = apiData.slice(sliceStart, sliceStart + 10);

  const nextPage = () => updateFilters({ uiPage: filters.uiPage + 1 });
  const prevPage = () => updateFilters({ uiPage: Math.max(filters.uiPage - 1, 1) });

  return {
    articles: currentArticles,
    loading,
    error,
    uiPage: filters.uiPage,
    nextPage,
    prevPage,
    hasMore: apiData.length === 100 || (sliceStart + 10 < apiData.length)
  };
};