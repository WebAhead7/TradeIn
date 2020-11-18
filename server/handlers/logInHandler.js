const models = require("../models");
const redirectHandler = require("./redirectHandler");
function logInHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    console.log(body);
    const userDetails = JSON.parse(body);
    models
      .userWithEmailAndPasswordExist(userDetails)
      .then((found) => {
        if (!found) {
          response.writeHead(401, { "content-type": "application/json" });
          response.end(JSON.stringify({ msg: "Unauthenticated user !" }));
          return;
        }
        return models.getAllTradeInPosts();
      })
      .then((posts) => {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            msg: "logged in successfully",
            url: "/public/src/home.html",
            posts,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        redirectHandler(response, "/serverError");
      });
  });
  request.on("error", (err) => {
    console.error(err);
    redirectHandler(response, "/serverError");
  });
}

module.exports = logInHandler;
