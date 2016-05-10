const http = require('http');

const server = module.exports = exports = http.createServer((req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('<h1>Error 404</h1>');
  return res.end();
});
server.listen(5000, () => process.stdout.write('server up on 5000'));
