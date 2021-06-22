const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  detail: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = MenuItem = mongoose.model("MenuItem", menuItemSchema, "menu");
