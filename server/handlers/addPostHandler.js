const models = require("../../database/models");
const redirectHandler = require("./redirectHandler");

function addPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    models.insertNewUser(JSON.parse(body));
  });
  request.on("error", (err) => {
    console.error(err);
    redirectHandler(response, "/serverError");
  });
}

module.exports = addPostHandler;
