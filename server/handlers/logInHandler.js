const models = require("../../database/models");
const redirectHandler = require("./redirectHandler");

function logInHandler(request, response) {
  let username;
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    console.log(body);
    const userDetails = JSON.parse(body);
    models
      .userWithEmailAndPasswordExist(userDetails)
      .then((users) => {
        const found = users.length !== 0;
        if (!found) {
          response.writeHead(401, { "content-type": "application/json" });
          response.end(JSON.stringify({ msg: "Unauthenticated user !" }));
          return;
        }
        console.log(users);
        username = users[0].username;
        return models.getAllTradeInPosts();
      })
      .then((posts) => {
        if(posts){
          const { email, password } = userDetails;
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            msg: "logged in successfully",
            url: "/public/src/home.html",
            posts,
            email,
            password,
            username,
          })
        );
        }
        
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
