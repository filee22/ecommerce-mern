const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    brand: { type: String },
    model: { type: String },
    details: { type: String },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    imgNumber: { type: Number },
    thumbnail: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    name: { type: String },
    color: { type: String },
    highlight: { type: String },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
