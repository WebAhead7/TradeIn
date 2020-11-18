const homeHandler = require("./handlers/homeHandler");
const logInHandler = require("./handlers/logInHandler");
const publicHandler = require("./handlers/publicHandler");
const notfoundHandler = require("./handlers/notFoundHandler");
const serverErrorHandler = require("./handlers/serverErrorHandler");
const signUpHandler = require("./handlers/signUpHandler");
const addPostHandler = require("./handlers/addPostHandler");

module.exports = (req, res) => {
  const { url, method } = req;
  console.log(url);
  if (url === "/") {
    homeHandler(req, res);
  } else if (url.startsWith("/public")) {
    publicHandler(req, res);
  } else if (url === "/serverError") {
    serverErrorHandler(req, res);
  } else if (url === "/sign-up" && method === "POST") {
    signUpHandler(req, res);
  } else if (url === "/log-in" && method === "POST") {
    logInHandler(req, res);
  } else if (url === "/add-new-post" && method === "POST") {
    addPostHandler(req, res);
  } else {
    notfoundHandler(req, res);
  }
};
