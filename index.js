// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());

const users = [
  {id:1, name: "shohan", email: "shohan23@gmail.com"},
  {id:2, name: "mehedi", email: "mehedi23@gmail.com"},
  {id:3, name: "hasan", email: "hasan23@gmail.com"}
];
// Middleware
app.use(express.json());
app.use(express.json());

// Simple Route
app.get('/', (req, res) => {
  res.send('Hello, Express backend is running!');
});

app.get('/users', (req, res) =>{
  res.json(users);
});

// POST route to receive data from frontend
app.post('/users', (req, res) => {
  console.log(req.body);
  console.log('api hitting');
  const newUser = req.body;
  newUser.id = users.length +1;
  users.push(newUser);
  res.send(newUser);
})

// Server listen
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
