const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      }, 
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
        required: true,
      },
      price: { 
        type: Number,
        required: true,
      },
      status:{
        type:String,
        enum: ['pending','approved','dispatched','delivered','cancelled'],
        default: 'pending'
      }
    },

  ],
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  //add another 
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'completed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;