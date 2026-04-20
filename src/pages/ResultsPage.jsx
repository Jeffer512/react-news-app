import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

function ResultsPage() {
  return (
    <div className="results-page">
      <nav>
        <SearchBar />
        <Filters />
      </nav>
      <main>
        <ArticleList />
      </main>
    </div>
  );
}

export default ResultsPage;