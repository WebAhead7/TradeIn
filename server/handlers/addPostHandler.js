const models = require("../../database/models");
const redirectHandler = require("./redirectHandler");

function addPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    console.log(body);
    models
      .insertNewPost(JSON.parse(body))
      .then((result) => {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            msg: "Added Succesfully",
          })
        );
      })
      .catch(console.error);
  });
  request.on("error", (err) => {
    console.error(err);
    redirectHandler(response, "/serverError");
  });
}

module.exports = addPostHandler;
