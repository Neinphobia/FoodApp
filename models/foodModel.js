// models/foodModel.js

const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },
  temp: { type: Number },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
