const logInHandler = require("./handlers/logInHandler");
const publicHandler = require("./handlers/publicHandler");
const notfoundHandler = require("./handlers/notFoundHandler");
const serverErrorHandler = require("./handlers/serverErrorHandler");
const signUpHandler = require("./handlers/signUpHandler")
const urlModule = require("url");

module.exports = (req, res) => {
  const { url } = req;
  console.log(url);

  if (url === '/') {
    logInHandler(req, res);
  } else if (url.startsWith('/public')) {
    publicHandler(req, res);
  } else if (url === "/serverError") {
    serverErrorHandler(req, res);
  } else if (url === "/sign-up") {
    console.log(url);
    signUpHandler(req, res);
  }
  else {
    notfoundHandler(req, res);
  }
};
