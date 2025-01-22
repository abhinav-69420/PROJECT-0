const Cart = require('../models/cartModels');
// const Product = require("../models/productsModels");
const asyncHandler = require('express-async-handler');

const addToCart = async (req, res) => {
  try {
    const { userId } = req.user; 
    const { productId } = req.body;

    let cart = await Cart.findOne({ buyerId: userId });
    if (!cart) {
      cart = new Cart({ buyerId: userId });
    }

    const productIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      cart.cartItems[productIndex].quantity += 1;
    } else {
      cart.cartItems.push({ productId, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message }); 
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user; 
    const { productId } = req.body;

    const cart = await Cart.findOne({ buyerId: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Helper function to determine which price to use

// Fetch cart data and calculate total
const getCart = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch the cart and populate the productId field with name, adminPrice, and sellerPrice
    const cart = await Cart.findOne({ buyerId: userId }).populate({
      path: 'cartItems.productId',
      select: 'name adminPrice images', // Include all necessary fields
    });
    console.log(cart);
    

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate the subtotal
    const subtotal = cart.cartItems.reduce((acc, item) => {
      const price = item.productId.adminPrice; // Use the helper function to determine the price
      return acc + price * item.quantity;
    }, 0);

    // Calculate the tax amount (assuming a 7% tax rate)
    const taxRate = 0.07;
    const taxAmount = subtotal * taxRate;

    // Calculate the shipping fee (assuming a flat rate of $10)
    const shippingFee = 10;

    // Calculate the total cost
    const total = subtotal + taxAmount + shippingFee;

    // Return the cart data with the calculated costs
    res.status(200).json({
      cart: {
        ...cart.toObject(),
        subtotal,
        taxAmount,
        shippingFee,
        total,
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { productId, action } = req.body;

  const cart = await Cart.findOne({ buyerId: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const productIndex = cart.cartItems.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (productIndex !== -1) {
    if (action === 'increment') {
      cart.cartItems[productIndex].quantity += 1;
    } else if (action === 'decrement') {
      if (cart.cartItems[productIndex].quantity > 1) {
        cart.cartItems[productIndex].quantity -= 1;
      } else {
        // Check if the product has a warning flag
        if (cart.cartItems[productIndex].warning) {
          // Remove the product if the warning flag is set
          cart.cartItems.splice(productIndex, 1);
        } else {
          // Set a warning flag if the quantity is 1 and decrement is called
          cart.cartItems[productIndex].warning = true;
          res.status(200).json({ message: 'Warning: Quantity is 1. Click again to remove the product.' });
          return;
        }
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Cart updated' });
  } else {
    return res.status(400).json({ message: 'Product not found in cart' });
  }
});

module.exports = { 
    addToCart, 
    removeFromCart, 
    getCart,
    updateCartItem };