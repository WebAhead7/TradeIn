const fs = require("fs");
const path = require("path");
const db = require("../../database/connection")
const { URLSearchParams } = require("url");

function signUpHandler(request, response) {
    let body = "";
    request.on("data", chunk => {
        body += chunk
    });
    request.on("end", () => {
        console.log(body);
        const userParams = new URLSearchParams(body);
        const data = Object.fromEntries(userParams)
        console.log(data);
        response.end();
    });
    request.on('error', (err) => {
        console.error(err);
        response.writeHead(302, { location: '/serverError' });
        response.end();
    })

}
module.exports = signUpHandler;