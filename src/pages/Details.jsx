import { useLocation, useParams, useNavigate } from "react-router-dom";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { uri } = useParams();

  // Access the article object passed through the navigation state
  const article = location.state?.article;

  // Handle direct URL access where navigation state is absent
  if (!article) {
    return (
      <div className="details-error">
        <p>Article details not found.</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="article-details">
      <button onClick={() => navigate(-1)}>← Back</button>
      
      {article.image && (
        <img src={article.image} alt={article.title} className="details-image" />
      )}
      
      <h1>{article.title}</h1>
      
      <div className="metadata">
        <span>{article.date}</span> | <span>{article.source?.title}</span>
      </div>
      
      <div className="content">
        <p>{article.body}</p>
      </div>
      
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="source-link">
        Read full article at {article.source?.title}
      </a>
    </div>
  );
}

export default Details;