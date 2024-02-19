const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  type: String,
  company: String,
  UserId: String,
});

const Product = new mongoose.model("products", ProductSchema);

module.exports = Product;
