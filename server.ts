import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  let filePath = '.' + req.url!;

  // Default to serving index.html
  if (filePath === './') {
    filePath = './index.html';
  }

  filePath = path.resolve(filePath);

  // Determine content type based on file extension
  let contentType = 'text/html';
  const extname = path.extname(filePath);
  if (extname === '.css') {
    contentType = 'text/css';
  } else if (extname === '.jpg' || extname === '.jpeg') {
    contentType = 'image/jpeg';
  } else if (extname === '.png') {
    contentType = 'image/png';
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
