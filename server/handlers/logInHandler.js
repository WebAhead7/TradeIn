const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
  fs.readFile(filePath, (err, file) => {
    res.setHeader('type-content', 'text/html');
    if (err) {
      res.status(404);
      res.end('<h1>Error</h1>');
      return;
    }
    res.end(file);
  });
};
