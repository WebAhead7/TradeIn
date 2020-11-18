const db = require("./connection");

function getAllUsers() {
  return db.query("select * from users").then((result) => result.rows);
}

function insertNewUser(user) {
  return db.query(
    "insert into users (username,email,password,location) values ($1,$2,$3,$4) returning (email,password)",
    [user.username, user.email, user.password, user.location]
  );
}

function getUserByEmail(email) {
  return db
    .query("select * from users where email = $1", [email])
    .then((result) => result.rows);
}

function userWithEmailAndPasswordExist({ email, password }) {
  return db
    .query("select * from users where email=$1 and password=$2", [
      email,
      password,
    ])
    .then((result) => result.rows);
}

function getAllTradeInPosts() {
  return db
    .query(
      "select username, trade_in, trade_out, text_content,email from users right join trade_posts on users.id = trade_posts.user_id"
    )
    .then((result) => result.rows);
}

function insertNewPost({ text_content, trade_in, trade_out, email, password }) {
  db.query("select id from users where email = $1 and password =$2", [
    email,
    password,
  ])
    .then((result) => {
      if (result.rowCount >= 0) {
        return result.rows[0].id;
      } else {
        throw new Error(`Bad usage: ${email} doesn't match any user`);
      }
    })
    .then((userid) => {
      db.query(
        "insert into trade_posts (user_id,text_content,trade_in,trade_out) values ($1,$2,$3,$4)",
        [userid, text_content, trade_in, trade_out]
      );
    })
    .catch(console.error);
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  insertNewUser,
  userWithEmailAndPasswordExist,
  getAllTradeInPosts,
  insertNewPost,
};
