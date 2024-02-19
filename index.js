const mongoose = require("./db/db.js");
const User = require("./db/User.js");
const Product = require("./db/product.js");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  let data = new User(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let data = await User.findOne(req.body).select("-password");
    if (data) {
      res.send(data);
    } else {
      res.send({ text: "no user found" });
    }
  }
});

app.post("/add-product", async (req, res) => {
  let data = new Product(req.body);
  let result = await data.save();
  res.send(result);
});

app.get("/products/:id", async (req, res) => {
  let data = await Product.find({ UserId: req.params.id });
  res.send(data);
});

app.delete("/delete-product/:id", async (req, res) => {
  let data = await Product.deleteOne({ _id: req.params.id });
  res.send(data);
});

app.put("/update-product/:id", async (req, res) => {
  let data = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(data);
});

app.get("http:/localhost:5000/getproduct/:id", async (req, res) => {
  let data = await Product.findOne({ _id: req.params.id });
  res.send(data);
});

app.listen(5000);
