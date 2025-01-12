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

const getCart = async (req, res) => {
  try {
    const { userId } = req.user; 

    const cart = await Cart.findOne({ buyerId: userId })
      .populate('cartItems.productId', 'name price') 
      .exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let subTotal = 0;
    cart.cartItems.forEach((item) => {
      subTotal += item.productId.price * item.quantity;
    });

    const taxRate = 0.07; // 7% tax
    const taxAmount = subTotal * taxRate;
    const total = subTotal + taxAmount;

    res.status(200).json({ 
      cart, 
      subTotal, 
      taxAmount, 
      total 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const decreaseCartItem = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.body;
  
    const cart = await Cart.findOne({ buyerId: userId });
  
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
  
    const productIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );
  
    if (productIndex !== -1) {
      if (cart.cartItems[productIndex].quantity > 1) {
        cart.cartItems[productIndex].quantity -= 1;
      } else {
        cart.cartItems.splice(productIndex, 1); // Remove item if quantity reaches 0
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
    decreaseCartItem };