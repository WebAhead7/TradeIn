const test = require('tape');
const build = require('../build');
const {
  getAllPosts,
  getUserWithEmail,
  getAllPostFromUserId,
  insertNewUser,
  getAllUsers,
} = require('../model');

test('Can get all posts', (t) => {
  build().then(() => {
    getAllPosts().then((res) => {
      // console.log(res);
    });
  });
  t.end();
});

test('Can get user with email', (t) => {
  build().then(() => {
    getUserWithEmail('Moull1990@mail.com').then((res) => {
      // console.log(res);
    });
  });
  t.end();
});

test('Can get all posts from user', (t) => {
  build().then(() => {
    getAllPostFromUserId(1).then((res) => {
      console.log(res);
    });
  });
  t.end();
});

test('Can insert new user', (t) => {
  build().then(() => {
    const newUser = {
      username: 'a',
      email: 'a',
    };
    insertNewUser(newUser).then((res) => console.log(res));
  });
  t.end();
});
