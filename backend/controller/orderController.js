const Order = require('../models/ordermodels');
const Product = require('../models/productsModels');
const { validateOrderItems } = require('../utils/validation');
const { createError } = require('../utils/errors');

const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderItems } = req.body;

    // Validate input data
    const validationErrors = validateOrderItems(orderItems);
    if (validationErrors.length > 0) {
      //throw createError(400, 'Invalid order items', validationErrors);
      console.log("Validation errors:", validationErrors);
      return res.status(400).json({ errors: validationErrors });
    }

    // Create order items
    const result = await createOrderItems(orderItems);


        // Check if order creation failed
        if (!result.success) {
          return res.status(400).json({
            message: result.message,
            outOfStockProducts: result.outOfStockProducts,
            missingProductIds: result.missingProductIds,
          });
        }
    const orderItemsData = result.orderItemsData || [];


    // Create order
    const newOrder = new Order({
      buyerId: userId,
      orderItems: orderItemsData,
      subtotal: calculateSubtotal(orderItemsData),
      total: calculateTotal(orderItemsData),
      orderStatus: 'Pending',
    });

    // Save order
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrder:", error);
    //res.status(error.statusCode).json(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// commented below code due to error, below code is more efficient btw

// const createOrderItems = async (orderItems) => {
//   const orderItemsData = [];

//   // Use Promise.all to batch database operations
//   const products = await Promise.all(orderItems.map((item) => Product.findById(item.productId)));
//   for (const [index, product] of products.entries()) {
//     if (!product) {
//       throw createError(404, `Product with ID ${orderItems[index].productId} not found`);
//     }

//     if (product.quantity < orderItems[index].quantity) {
//       throw createError(400, `Insufficient stock for product with ID ${orderItems[index].productId}`);
//     }

//     const orderItemData = {
//       productId: orderItems[index].productId,
//       name: product.name,
//       quantity: orderItems[index].quantity,
//       price: product.adminPrice,
//     };

//     orderItemsData.push(orderItemData);

//     // Decrement product quantity
//     product.quantity -= orderItems[index].quantity;
//     await product.save();
//   }

//   return orderItemsData;
// };

const createOrderItems = async (orderItems) => {
  const productIds = orderItems.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  
  // Check if all product IDs exist
  if (products.length !== orderItems.length) {
    const missingProductIds = productIds.filter(
      (id) => !products.some((product) => product._id.toString() === id)
    );

    return {
      success: false,
      message: "Some products do not exist",
      missingProductIds,
      orderItemsData: [], // Ensure orderItemsData is always an array
    };
  }


  const orderItemsData = [];
  const outOfStockProducts = [];

  products.forEach((product) => {
    const item = orderItems.find((item) => item.productId === product._id.toString());
    if (product.quantity < item.quantity) {
      outOfStockProducts.push({
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        sellerId: product.sellerId
      });
    } else {
      const orderItemData = {
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: product.adminPrice,
        sellerId: product.sellerId
      };

      orderItemsData.push(orderItemData);

      // Decrement product quantity
      product.quantity -= item.quantity;
    }
  });

  await Product.bulkWrite(
    products.map((product) => ({
      updateOne: {
        filter: { _id: product._id },
        update: { $set: { quantity: product.quantity } },
      },
    }))
  );

  if (outOfStockProducts.length > 0) {
    return {
      success: false,
      message: "Some products are out of stock",
      outOfStockProducts,
      orderItemsData: [],
    };
  }

  return {
    success: true,
    orderItemsData,
  };
};

const calculateSubtotal = (orderItemsData) => {
  return orderItemsData.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
};

const calculateTotal = (orderItemsData) => {
  return calculateSubtotal(orderItemsData); // You can add taxes, shipping costs here
};

module.exports = { createOrder, getOrderHistory };