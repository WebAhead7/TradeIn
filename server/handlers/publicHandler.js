const fs = require("fs");
const path = require("path");

const contentTypes = {
  ".js": "application/javascript",
  ".html": "text/html",
  ".css": "text/css",
};

function publicHandler(request, response) {
  // url = public\index.css , public/src/home.html
  const { url } = request;
  const filePath = path.join(__dirname, "..", "..", url);
  const contentType = contentTypes[path.extname(url)];
  if (contentType) {
    fs.readFile(filePath, (err, file) => {
      if (err) {
        response.wirteHead(302, { location: "/serverError" });
        response.end();
        return;
      }
      response.writeHead(200, { "content-type": contentType });
      response.end(file);
    });
  } else {
    response.writeHead(302, { location: "/notFound" });
    response.end();
  }
}

module.exports = publicHandler;
