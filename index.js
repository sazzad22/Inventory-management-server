const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const port = process.env.PORT || 5000;
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//CONNECTING  to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@warehouse.xnn1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    //collection
    const productCollection = client
      .db("warehouseInventory")
      .collection("inventory");

    //API
    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Warehouse Management serverrd");
});

app.listen(port, () => {
  console.log("Warehouse Management Server- ", port);
});
