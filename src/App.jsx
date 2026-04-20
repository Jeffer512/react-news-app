import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResultsPage from './pages/ResultsPage';
import Details from './pages/Details';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';

function App() {
  return (
    <div>
      <nav>
        <SearchBar />
        <Filters />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<ResultsPage />} />
        <Route path="/article/:uri" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;