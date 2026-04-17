import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';

function ResultsPage() {
  return (
    <div className="results-page">
      <nav>
        <SearchBar />
      </nav>
      <main>
        <ArticleList />
      </main>
    </div>
  );
}

export default ResultsPage;