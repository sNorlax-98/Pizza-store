const express = require("express");
const mongoDB = require("./db");
const { Schema } = require("mongoose");
const app = express();
const port = 5000;
const cors = require("cors");

const mongoose = require("mongoose");
const dataSchema = new Schema({
  name: String,
  price: Number,
  categories: String,
  imgUrl: String,
});
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});
mongoDB();
/* `app.use(cors({ origin: "*" }));` is setting up Cross-Origin Resource Sharing (CORS) for the Express
app. CORS is a security feature implemented in web browsers that restricts web pages from making
requests to a different domain than the one that served the web page. By setting `origin: "*"`, the
server is allowing requests from any domain to access its resources. This is useful when building
APIs that need to be accessed by different domains or when developing locally and testing with
different front-end applications. */
app.use(cors({ origin: "*" }));
/* `app.use(express.json());` is a middleware function in Express that parses incoming requests with
JSON payloads. It basically allows the server to accept JSON data in the request body and parse it
into a JavaScript object that can be used in the server-side code. */
app.use(express.json());

/* This code is defining a route for a GET request to the root endpoint ("/"). When a GET request is
made to this endpoint, it creates a model for the "pizza" collection using the `mongoose.model()`
method, and then calls the `find()` method on the model to retrieve all the documents in the
collection. Finally, it sends a JSON response with the retrieved data. */
app.get("/", (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  pizza.find({}).then((data) => {
    res.json(data);
  });
});

/* This code is defining a route for getting all the documents in the "pizza" collection in the MongoDB
database where the "categories" field is equal to "veg". When a GET request is made to the "/veg"
endpoint, it creates a model for the "pizza" collection using the `mongoose.model()` method, and
then calls the `find()` method on the model with a query object to retrieve all the documents in the
collection where the "categories" field is equal to "veg". Finally, it sends a JSON response with
the retrieved data. */
app.get("/veg", (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  pizza.find({ categories: "veg" }).then((data) => {
    res.json(data);
  });
});

/* This code is defining a route for adding a new document to the "Cart" collection in the MongoDB
database. When a POST request is made to the "/cart" endpoint, it creates a model for the "Cart"
collection using the `mongoose.model()` method, and then calls the `create()` method on the model to
add a new document to the collection with the data provided in the request body. Finally, it sends a
response with the message "send". */
app.post("/cart", (req, res) => {
  const cart = mongoose.model("Cart", dataSchema);
  const { name, price, categories, imgUrl } = req.body;
  cart
    .create({
      name,
      price,
      categories,
      imgUrl,
    })
    .then((data) => {
      res.send("send");
    });
});
/* This code is defining a route for handling a POST request to the "/login" endpoint. When a POST
request is made to this endpoint, it creates a model for the "user" collection using the
`mongoose.model()` method, and then calls the `create()` method on the model to add a new document
to the collection with the data provided in the request body (name, email, and password). Finally,
it sends a JSON response with the message "successful registration". This code is used for
registering a new user in the application. */
app.post("/login", (req, res) => {
  const user = mongoose.model("user", userSchema);
  const { name, email, password } = req.body;
  user
    .create({
      name,
      email,
      password,
    })
    .then((data) => {
      res.json("sucessfull regiestration");
    });
});
/* This code is defining a route for getting all the documents in the "user" collection in the MongoDB
database. When a GET request is made to the "/login" endpoint, it creates a model for the "user"
collection using the `mongoose.model()` method, and then calls the `find()` method on the model to
retrieve all the documents in the collection. Finally, it sends a JSON response with the retrieved
data. */
app.get("/login", (req, res) => {
  const user = mongoose.model("user", userSchema);
  user.find({}).then((data) => {
    res.json(data);
  });
});

/* This code is defining a route for getting all the documents in the "Cart" collection in the MongoDB
database. When a GET request is made to the "/cart" endpoint, it creates a model for the "Cart"
collection using the `mongoose.model()` method, and then calls the `find()` method on the model to
retrieve all the documents in the collection. Finally, it sends a JSON response with the retrieved
data. */
app.get("/cart", (req, res) => {
  const cart = mongoose.model("Cart", dataSchema);
  cart.find({}).then((data) => {
    res.json(data);
  });
});
/* This code is defining a route for deleting all the documents in the "Cart" collection in the MongoDB
database. When a DELETE request is made to the "/cart" endpoint, it creates a model for the "Cart"
collection using the `mongoose.model()` method, and then calls the `deleteMany()` method on the
model to delete all the documents in the collection. Finally, it sends a JSON response with the
message "data". */
app.delete("/cart", (req, res) => {
  const cart = mongoose.model("Cart", dataSchema);
  cart.deleteMany({}).then((data) => {
    res.json("data");
  });
});

app.listen(port, () => {
  console.log(`server is listenting at http://localhost:${port}`);
});
