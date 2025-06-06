const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// Connection URI

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_KEYS}@cluster0.ppuciiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    //await client.close();
  }
}
run().catch(console.dir);

const db = client.db('myDatabase').collection('myCollection'); // Replace 'myCollection' with your collection name


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
}
);

app.post('/add', async (req, res) => { 
  const newData = req.body;
  console.log(newData);
  const result = await db.insertOne(newData);
  res.send(`Data added successfully with ID: ${result}`);

})



app.listen(port, () => {
     console.log (`server is running on port  ${port}`);
})