import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.avif";

function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <div 
      className="article-container" 
      onClick={() => navigate(`/article/${encodeURIComponent(article.uri)}`, { state: { article } })}
    >
      <img src={article.image || placeholder} alt={article.title} loading="lazy"/>
      <h3>{article.title}</h3>
      <p className="article-body">{article.body?.slice(0, 300)}</p>
    </div>
  );
}

export default ArticleCard;