import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResultsPage from './pages/ResultsPage';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<ResultsPage />} />
      <Route path="/article/:uri" element={<Details />} />
    </Routes>
  );
}

export default App;