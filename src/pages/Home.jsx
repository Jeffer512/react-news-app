import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="home">
      <nav>
        <SearchBar />
      </nav>
      <main>
        <h1>Top Stories</h1>
        <ArticleList />
      </main>
    </div>
  );
}

export default Home;