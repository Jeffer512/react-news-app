import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NewsProvider } from './context/NewsContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NewsProvider>
  </StrictMode>,
);