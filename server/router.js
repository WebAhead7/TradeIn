const logInHandler = require('./handlers/logInHandler');
const publicHandler = require('./handlers/publicHandler');

module.exports = (req, res) => {
  const { url } = req;
  if (url === '/') {
    logInHandler(req, res);
  } else if (url.startsWith('/public')) {
    publicHandler(req, res);
  }
};
