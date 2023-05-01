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
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  pizza.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/veg", (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  pizza.find({ categories: "veg" }).then((data) => {
    res.json(data);
  });
});

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
app.get("/login", (req, res) => {
  const user = mongoose.model("user", userSchema);
  user.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/cart", (req, res) => {
  const cart = mongoose.model("Cart", dataSchema);
  cart.find({}).then((data) => {
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`server is listenting at http://localhost:${port}`);
});
