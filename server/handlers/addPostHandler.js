const models = require("../../database/models");
const redirectHandler = require("./redirectHandler");

function addPostHandler(request, response) {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    console.log(body);
    models.insertNewPost(JSON.parse(body));
    response.writeHead(200, { "content-type": "application/json" });
    response.end(
      JSON.stringify({
        msg: "all done",
      })
    );
  });
  request.on("error", (err) => {
    console.error(err);
    redirectHandler(response, "/serverError");
  });
}

module.exports = addPostHandler;
