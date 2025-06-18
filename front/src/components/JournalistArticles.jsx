import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesByJournalistId } from "../services/api";
import ArticleCard from "./ArticleCard";

export default function JournalistArticles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getArticlesByJournalistId(id);
        setArticles(data);
      } catch (err) {
        setError("Failed to load journalist's articles");
      }
    };
    fetch();
  }, [id]);

  const handleView = (articleId) => navigate(`/articles/${articleId}`);
  // Optional: define edit/delete handlers if needed here

  if (error) return <p>{error}</p>;

  return (
    <div>
        <h2>
            Articles by{" "}
            {articles.length > 0 ? articles[0].journalist_name : "this Journalist"}
        </h2>
        
        {articles.length === 0 ? (
        <p>No articles found.</p>
        ) : (
        <div className="article-list">
            {articles.map((article) => (
            <ArticleCard
                key={article.id}
                article={article}
                onView={handleView}
            />
            ))}
        </div>
        )}
    </div>
    );

}

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getArticlesByJournalistId } from "../services/api";
// // import { ArticleCard } from "./ArticleList";
// import ArticleCard from "./ArticleCard";
 
// export default function JournalistArticles() {
//   const { id } = useParams();
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const data = await getArticlesByJournalistId(id);
//         setArticles(data);
//       } catch (err) {
//         setError("Failed to load journalist's articles");
//       }
//     };
//     fetch();
//   }, [id]);

//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Articles by this Journalist</h2>
//       {articles.length === 0 ? (
//         <p>No articles found.</p>
//       ) : (
//         articles.map((article) => (
//           <ArticleCard key={article.id} article={article} />
//         ))
//       )}
//     </div>
//   );
// }

