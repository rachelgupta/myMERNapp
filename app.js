//{ 1. Printing User and health
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user', (req, res) => {
  const data = {
    count: 2,
    users: [
      {
        id: 1,
        name: "Rachel",
        email: "rachel@test.com"
      },
      {
        id: 2,
        name: "John",
        email: "john@test.com"
      }
    ]
  };
  res.json(data);
});

app.get('/health', (req, res) => {
  const data = {
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString()
  };
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//}

//{ 2. Modules in Node
const math = require('./math');
console.log("The value is", math.add(5, 10));

//}

//{ 3. Learning HTTP server
const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res) => {
  console.log(req.url);
  res.end("Hello from server");
});

myserver.listen(4000, () => {
  console.log('myserver is running at http://localhost:4000/');
});
//}

