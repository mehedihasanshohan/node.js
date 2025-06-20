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

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mhshohan01:DnPMDT5gJlntL2eo@cluster0.uufpspq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    // mongodb connection
    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    // get data
    app.get('/users', async(req, res) => {
      const cursor  = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.findOne(query);
      res.send(result);
    })

    app.post('/users', async(req, res) => {
      const newUser = req.body;
      console.log('new user', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(id, user);
      const filter = {_id: new ObjectId(id)}
      const  options = {upsert: true};
      const updatedDoc = {
        $set : {
          name: user.name,
          email: user.email
        }
      }

      const result = await userCollection.updateOne(filter, updatedUser, options);
      res.send(result);
    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      console.log('delete from database', id);
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

// mongodb


// Simple Route
app.get('/', (req, res) => {
  res.send('Hello, Express backend is running!');
});

// app.get('/users', (req, res) =>{
//   res.json(users);
// });

// POST route to receive data from frontend
// app.post('/users', (req, res) => {
//   console.log(req.body);
//   console.log('api hitting');
//   const newUser = req.body;
//   newUser.id = users.length +1;
//   users.push(newUser);
//   res.send(newUser);
// })

// Server listen
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
