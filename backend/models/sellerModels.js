const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
//   sellerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true, 
//   },

username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role:{
    type: String,
    enum: ['seller', 'admin'],
    default: 'seller',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Sellers = mongoose.model("Seller", sellerSchema);
module.exports = Sellers;