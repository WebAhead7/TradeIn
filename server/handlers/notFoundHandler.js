const fs = require("fs");
const path = require("path");

function notFoundHandler(request, response) {
    const filePath = path.join(__dirname, "..", "..", "public/notFound.html");
    fs.readFile(filePath, (err, file) => {
        response.writeHead(404, { "content-type": "text/html" });
        if (err) {
            console.log(err);
            response.end("<h1>404 Not Found</h1>");
            return;
        }
        response.end(file);

    });
}
module.exports = notFoundHandler;
