const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sellerId: {
    type:String,
    required: true
  },
  description: String,
  category: String,
  sellerPrice: { 
    type: Number,
    min: 0,
    required: true,
  },
  adminPrice: { 
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 0,
    required: true,
  },
  images:[{type:String}], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
})

const Product = mongoose.model('Product', productSchema)
module.exports=Product


