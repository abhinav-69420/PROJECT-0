const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartConroller')
const authMiddleware = require('../middleware/userAuth'); // Middleware for authentication

//router.use(authMiddleware); // Apply authentication middleware to all routes

cartRouter.post('/addtocart',authMiddleware, cartController.addToCart);
cartRouter.delete('/removefromcart',authMiddleware, cartController.removeFromCart);
cartRouter.get('/getcart',authMiddleware, cartController.getCart); // Using '/' for simplicity
cartRouter.get('/quantityminus',authMiddleware, cartController.decreaseCartItem); // Using '/' for simplicity

module.exports = cartRouter;