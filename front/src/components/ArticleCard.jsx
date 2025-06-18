import { Link } from "react-router-dom";

export default function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">
        By{" "}
        <Link to={`/journalists/${article.journalistId}/articles`}>
          {article.journalist_name}
        </Link>
      </div>

      <div className="article-actions">
        {onEdit && (
          <button className="button-tertiary" onClick={() => onEdit(article.id)}>
            Edit
          </button>
        )}
        {onDelete && (
          <button className="button-tertiary" onClick={() => onDelete(article.id)}>
            Delete
          </button>
        )}
        {onView && (
          <button className="button-secondary" onClick={() => onView(article.id)}>
            View
          </button>
        )}
      </div>
    </div>
  );
}
