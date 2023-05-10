const express = require("express");
const mongoDB = require("./db");
const { Schema } = require("mongoose");
const app = express();
const port = 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("./jwt");

const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
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
const cartSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  categories: String,
  imgUrl: String,
});
mongoDB();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(cookieParser());

app.get("/", validateToken, (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  pizza.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/search", validateToken, (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  const query = { name: req.query.name };
  pizza.find(query).then((data) => {
    res.json(data);
  });
});

app.get("/veg", validateToken, (req, res) => {
  const pizza = mongoose.model("pizza", dataSchema);
  pizza.find({ categories: "veg" }).then((data) => {
    res.json(data);
  });
});

app.post("/cart", validateToken, (req, res) => {
  const food = mongoose.model("food", cartSchema);
  const { name, price, categories, imgUrl, _id } = req.body;
  food
    .create({
      name,
      price,
      categories,
      imgUrl,
      _id,
    })
    .then((data) => {
      res.send("send");
    });
});

app.post("/register", (req, res) => {
  const user = mongoose.model("user", userSchema);
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    user
      .create({
        name,
        email,
        password: hash,
      })
      .then(() => {
        res.json("sucessfull regiestration");
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

app.post("/login", async (req, res) => {
  const user = mongoose.model("user", userSchema);
  const { email, password } = req.body;
  await user.findOne({ email }).then((data) => {
    if (!data) {
      res.json("user not found");
    } else {
      const dbpassword = data.password;
      bcrypt.compare(password, dbpassword).then((match) => {
        if (match) {
          const accessToken = createTokens(data);
          res.cookie("access-token", accessToken);
          res.json("login successfull");
        } else {
          res.json("password not match");
        }
      });
    }
  });
});

app.get("/cart", validateToken, (req, res) => {
  const food = mongoose.model("food", cartSchema);
  food.find({}).then((data) => {
    res.json(data);
  });
});

app.delete("/cart", validateToken, (req, res) => {
  const food = mongoose.model("food", cartSchema);
  food.deleteMany({}).then((data) => {
    res.json("data");
  });
});
app.delete("/cart/:id", validateToken, (req, res) => {
  const food = mongoose.model("food", cartSchema);
  food.deleteOne({ _id: req.params.id }).then((data) => {
    res.json("data");
  });
});

app.delete("/profile", validateToken, (req, res) => {
  const user = mongoose.model("user", userSchema);
  user.deleteMany({}).then((data) => {
    res.json("data");
  });
});
app.get("/profile", validateToken, (req, res) => {
  const user = mongoose.model("user", userSchema);
  user.find({}).then((data) => {
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`server is listenting at http://localhost:${port}`);
});
