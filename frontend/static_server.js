const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3002;
const distDir = path.join(__dirname, 'dist');

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const server = http.createServer((req, res) => {
  const reqPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(distDir, reqPath === '/' ? 'index.html' : reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.statusCode = 400;
    return res.end('Bad request');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // fallback to index.html for SPA routes
      filePath = path.join(distDir, 'index.html');
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.statusCode = 500;
        return res.end('Server error');
      }
      const ext = path.extname(filePath);
      res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
      res.end(content);
    });
  });
});

server.listen(port, () => console.log(`Static server serving ${distDir} at http://localhost:${port}`));
