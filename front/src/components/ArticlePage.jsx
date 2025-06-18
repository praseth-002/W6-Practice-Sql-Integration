// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getArticleById } from "../services/api";

// export default function ArticlePage() {
//   const { id } = useParams();

//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchArticle();
//   }, []);


//   const fetchArticle = async () => {
//     try {
//       setLoading(true);

//       const found = getArticleById(id);
//       if (found) {
//         setArticle(found);
//         setError("");
//       } else {
//         setArticle(null);
//         setError("Article not found.");
//       }
//     } catch (err) {
//       setError("Failed to fetch article.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading article...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!article) return <div>No article found.</div>;

//   return (
//     <div>
//       <h2>{article.title}</h2>
//       <p>{article.content}</p>
//       <div>
//         <strong>Journalist:</strong> {article.journalist}
//       </div>
//       <div>
//         <strong>Category:</strong> {article.category}
//       </div>
//     </div>
//   );
// }

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (err) {
        setError("Failed to load article");
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <p><strong>Category:</strong> {article.category}</p>

      {/* 🧠 Journalist Info */}
      <p>
        <strong>Written by:</strong>{" "}
        <Link to={`/journalists/${article.journalistId}/articles`}>
          {article.journalist_name}
        </Link>
      </p>
    </div>
  );
}
