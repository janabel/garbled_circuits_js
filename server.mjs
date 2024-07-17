import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const express = import('express');
const path = import('path');
const app = express();
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World blah');
});

// Not recommended insecure
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});