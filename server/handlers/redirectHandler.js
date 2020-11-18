function redirectHandler(response, location) {
  response.writeHead(302, { location: location });
  response.end();
}
module.exports = redirectHandler;
