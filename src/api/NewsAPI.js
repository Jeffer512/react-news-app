import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://eventregistry.org/api/v1";

const newsApi = axios.create({
  baseURL: BASE_URL,
});

/**
 * Fetches articles from NewsAPI.ai based on provided filters.
 * 
 * @param {Object} filters - The search criteria.
 * @param {number} [filters.articlesPage=1] - The page number for pagination.
 * @param {string} [filters.keyword] - Search term for articles.
 * @param {string} [filters.categoryUri] - Category URI (e.g., 'dmoz/Business').
 * @param {string} [filters.categoryOper] - Operator for categories ('and' or 'or').
 * @param {string} [filters.articlesSortBy] - Criteria to sort by ('date', 'relevance', 'socialScore').
 * @param {boolean} [filters.articlesSortByAsc] - Sort order (true for ascending, false for descending).
 * @param {string} [filters.dateStart] - Start date in YYYY-MM-DD format.
 * @param {string} [filters.dateEnd] - End date in YYYY-MM-DD format.
 * @returns {Promise<Array>} A promise that resolves to an array of article objects.
 * @throws {Error} If the network request fails.
 */

export const getArticles = async (filters) => {
  const requestBody = {
    action: "getArticles",
    resultType: "articles",
    articlesPage: filters.articlesPage || 1,
    articlesCount: 100,
    keyword: filters.keyword,
    // Default to dmoz/News category only if no keyword is present
    categoryUri: filters.categoryUri.length > 0 ? filters.categoryUri : "",
    categoryOper: filters.categoryUri.length > 1 ? filters.categoryOper : "",
    articlesSortBy: filters.articlesSortBy,
    articlesSortByAsc: filters.articlesSortByAsc,
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd, 
    forceMaxDataTimeWindow: 31,
    lang: "eng",
    apiKey: API_KEY,
  };

  const cleanBody = Object.fromEntries(
    Object.entries(requestBody).filter(([_, value]) => value !== "" && value != null)
  );

  try {
    const response = await newsApi.post("/article/getArticles", cleanBody);
    return response.data.articles.results;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};