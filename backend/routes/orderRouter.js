const express = require('express');
const orderRouter = express.Router();
const { validateOrderItems } = require('../utils/validation');
const { createError } = require('../utils/errors');
const orderController = require('../controller/orderController');
const authMiddleware = require('../middleware/userAuth');
//const sellerController = require('../controllers/sellerController');


// create an order when placed by a buyer
orderRouter.post('/createorder',authMiddleware, async (req, res) => {
  const validationErrors = validateOrderItems(req.body.orderItems);
  if (validationErrors.length > 0) {
    const error = createError(400, 'Invalid order items', validationErrors);
    res.status(error.statusCode).json(error);
  } else {
    try {
      await orderController.createOrder(req, res);
    } catch (error) {
      const err = createError(500, error.message);
      res.status(err.statusCode).json(err);
    }
  }
});

// Get order history for a buyer
orderRouter.get('/history', async (req, res) => {
    try {
      const orders = await orderController.getOrderHistory(req.user);
      res.status(200).json(orders);
    } catch (error) {
      const err = createError(500, error.message);
      res.status(err.statusCode).json(err);
    }
  });

  // Get all orders for a seller
// router.get('/seller/orders', async (req, res) => {
//     try {
//       const orders = await sellerController.getSellerOrders(req.user);
//       res.status(200).json(orders);
//     } catch (error) {
//       const err = createError(500, error.message);
//       res.status(err.statusCode).json(err);
//     }
//   });

module.exports = orderRouter;