// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const users = [
  {id:1, name: "shohan", email: "shohan23@gmail.com"},
  {id:2, name: "mehedi", email: "mehedi23@gmail.com"},
  {id:3, name: "hasan", email: "hasan23@gmail.com"}
];

// mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.qbdqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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
