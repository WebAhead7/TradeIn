const db = require('./connection');

function getAllPosts() {
  return db.query('SELECT * FROM trade_posts').then((res) => res.rows);
}

function getUserWithEmail(email) {
  return db
    .query(`SELECT * FROM users WHERE email='${email}'`)
    .then((res) => res.rows);
}

function getAllPostFromUserId(id) {
  return db
    .query(`SELECT * FROM trade_posts WHERE user_id=${id}`)
    .then((res) => res.rows);
}

function addUser(user) {}

function addPost(post) {}
module.exports = {
  getAllPosts,
  getUserWithEmail,
  getAllPostFromUserId,
  addUser,
  addPost,
};
