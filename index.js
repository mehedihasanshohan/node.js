// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const users = [
  {id:1, name: "shohan", email: "shohan23@gmail.com"},
  {id:2, name: "mehedi", email: "mehedi23@gmail.com"},
  {id:3, name: "hasan", email: "hasan23@gmail.com"}
];
// Middleware
app.use(express.json());

// Simple Route
app.get('/', (req, res) => {
  res.send('Hello, Express backend is running!');
});

app.get('/users', (req, res) =>{
  res.json(users);
});

// Server listen
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
