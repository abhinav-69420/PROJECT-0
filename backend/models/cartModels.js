const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
        required: true,
      },
      
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;