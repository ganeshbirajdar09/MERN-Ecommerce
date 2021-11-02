const mongoose = require("mongoose");
const { ObjectId } = mongoose;

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    maxlength: 32,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
    requird: true,
  },
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
    default: 0,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
