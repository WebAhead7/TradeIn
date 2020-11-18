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

function getAllUsers() {
  return db.query('select * from users').then((result) => result.rows);
}

function insertNewUser(user) {
  return db.query(
    'insert into users (username,email,password,location) values ($1,$2,$3,$4) returning (username,email,location)',
    [user.username, user.email, user.password, user.location]
  );
}

function getUserByEmail(email) {
  return db
    .query('select * from users where email = $1', [email])
    .then((result) => result.rows);
}
module.exports = {
  getAllPosts,
  getUserWithEmail,
  getAllPostFromUserId,
  getUserByEmail,
  getAllUsers,
  insertNewUser,
};
