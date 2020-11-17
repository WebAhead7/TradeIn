const fs = require("fs");
const path = require("path");

function serverErrorHandler(request, response) {
  const filePath = path.join(__dirname, "..", "..", "public/serverError.html");
  fs.readFile(filePath, (err, file) => {
    response.writeHead(500, { "content-type": "text/html" });
    if (err) {
      console.log(err);
      response.end("<h1>500 Server Error</h1>");
      return;
    }
    response.end(file);

  });
}



module.exports = serverErrorHandler;
