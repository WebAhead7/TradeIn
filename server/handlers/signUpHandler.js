const fs = require('fs');
const path = require('path');
const models = require('../../database/models');

function signUpHandler(request, response) {
<<<<<<< HEAD
  let body = "";
  console.log("");
  request.on("data", (chunk) => {
=======
  let body = '';
  request.on('data', (chunk) => {
>>>>>>> 92604bc07f947629a4ec7a63a582aab62be26b18
    body += chunk;
  });
  request.on('end', () => {
    console.log(body);
    // const userParams = new URLSearchParams(body);
    const { email, username, password, location } = JSON.parse(body);
    console.log({
      email,
      username,
      password,
      location,
    });
    models
      .getUserByEmail(email)
      .then((users) => {
        if (users.length === 0) {
          models
            .insertNewUser({
              email,
              username,
              password,
              location,
            })
            .then((result) => {
              console.log(result);
              response.writeHead(200, { 'content-type': 'application/json' });
              response.end(
                JSON.stringify({ msg: 'User succesfully added', url: '/' })
              );
            })
            .catch((err) => {
              console.error(err);
              response.writeHead(302, { location: '/serverError' });
              response.end();
            });
          return;
        }
        response.writeHead(206, { 'content-type': 'application/json' });
        response.end(
          JSON.stringify({ msg: 'User exist, please use another email... ' })
        );
      })
      .catch((err) => {
        console.log(err);
        response.writeHead(302, { location: '/serverError' });
        response.end();
      });
  });
  request.on('error', (err) => {
    console.error(err);
    response.writeHead(302, { location: '/serverError' });
    response.end();
  });
}
module.exports = signUpHandler;
