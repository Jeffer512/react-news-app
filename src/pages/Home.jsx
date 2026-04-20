import ArticleList from '../components/ArticleList';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="home">
      <nav>
        <SearchBar />
        <Filters />
      </nav>
      <main>
        <h1>Top Stories</h1>
        <ArticleList />
      </main>
    </div>
  );
}

export default Home;