import ArticleCard from "./ArticleCard";
import { useNews } from "../hooks/useNews";

function ArticleList() {
  const { articles, loading, error, uiPage, nextPage, prevPage, hasMore } = useNews();

  // Display error feedback if the API request fails
  if (error) return <p className="error-message">{error}</p>;

  // Show a loading state only on the initial fetch when no data exists
  if (loading && articles.length === 0) return <p className="loading-message">Loading news...</p>;

  if (articles.length === 0) return <p className="no-results">No articles found.</p>;

  return (
    <div className="article-list-container">
      {/* Indicate background fetching when crossing the 100-article boundary */}
      {loading && <p className="updating-message">Updating list...</p>}

      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.uri} article={article} />
        ))}
      </div>

      <div className="pag-buttons-container">
        <button
          className="prev-button"
          onClick={prevPage}
          disabled={uiPage === 1 || loading}
        >
          Prev
        </button>

        <span className="page-indicator">Page {uiPage}</span>

        <button
          className="next-button"
          onClick={nextPage}
          disabled={!hasMore || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArticleList;