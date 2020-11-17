const logInHandler = require("./handlers/logInHandler");
const publicHandler = require("./handlers/publicHandler");
const notfoundHandler = require("./handlers/notFound");
const serverErrorHandler = require("./handlers/serverError");

module.exports = (req, res) => {
  const { url } = req;
  if (url === "/") {
    logInHandler(req, res);
  } else if (url.startsWith("/public")) {
    publicHandler(req, res);
  } else if (url === "/serverError") {
    serverErrorHandler(request, response);
  } else {
    notfoundHandler(req, res);
  }
};
