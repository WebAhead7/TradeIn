const db = require('./connection');

function getAllUsers() {
  return db.query('select * from users').then((result) => result.rows);
}

function insertNewUser(user) {
  return db.query(
    'insert into users (username,email,password,location) values ($1,$2,$3,$4) returning (email,password)',
    [user.username, user.email, user.password, user.location]
  );
}

function getUserByEmail(email) {
  return db
    .query('select * from users where email = $1', [email])
    .then((result) => result.rows);
}

function userWithEmailAndPasswordExist({ email, password }) {
  return db
    .query('select * from users where email=$1 and password=$2', [
      email,
      password,
    ])
    .then((result) => result.rowCount === 1);
}

function getAllTradeInPosts() {
  return db
    .query(
      'select username, trade_in, trade_out, text_content from users right join trade_posts on users.id = trade_posts.user_id'
    )
    .then((result) => result.rows);
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  insertNewUser,
  userWithEmailAndPasswordExist,
  getAllTradeInPosts,
};
