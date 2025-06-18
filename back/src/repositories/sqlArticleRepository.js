import { pool } from "../utils/database.js"; // make sure this is the correct path

// export async function getArticles() {
//   const [rows] = await pool.query("SELECT * FROM articles");
//   return rows;
// }

export async function getArticles() {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist_name, j.email, j.bio
    FROM articles a
    JOIN journalists j ON a.journalistId = j.id
  `);
  return rows;
}


// export async function getArticleById(id) {
//   const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
//   return rows[0];
// }

export async function getArticleById(id) {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist_name, j.email, j.bio
    FROM articles a
    JOIN journalists j ON a.journalistId = j.id
    WHERE a.id = ?
  `, [id]);
  return rows[0]; // single article
}

export async function createArticle(article) {
  const { title, content, journalist, category } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
    [title, content, journalist, category]
  );
  return { id: result.insertId, ...article };
}

export async function updateArticle(id, updatedData) {
  const { title, content, journalist, category } = updatedData;
  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?",
    [title, content, journalist, category, id]
  );
  return result.affectedRows > 0 ? { id, ...updatedData } : null;
}

export async function deleteArticle(id) {
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export async function getArticlesByJournalistId(journalistId) {
  const [rows] = await pool.query(`
    SELECT a.*, j.name AS journalist_name
    FROM articles a
    JOIN journalists j ON a.journalistId = j.id
    WHERE j.id = ?
  `, [journalistId]);
  return rows;
}
