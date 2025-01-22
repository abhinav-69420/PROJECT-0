const Product = require("../models/productsModels");

const createProduct = async (req, res) => {
  try {
    const { userId } = req.user;
    

    const { name, description, category, sellerPrice, quantity,stock } = req.body;
    console.log(req.files)
    console.log(req.file)
    const img = req.files.map(file => file.filename);
    
    

    const newProduct = new Product({
      sellerId: userId,
      name,
      description,
      category,
      sellerPrice,
      quantity,
      images: img,
      stock
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: true }).populate('sellerId', 'username'); 
    //console.log(products);
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const getProductForApproval = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false }); 
    // console.log(products);
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const getProductsforseller = async (req, res) => {
  
  try {
    const { userId } = req.user
    const products = await Product.find({ sellerId: userId }).populate('sellerId', 'username'); 
    // console.log(products);
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const approveProduct = asyncHandler(async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId } = req.body;
  const { adminPrice } = req.body;
  

  // Find the product
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if the product is already approved
  if (product.isApproved) {
    return res.status(400).json({ message: 'Product is already approved' });
  }
  // Update the product with adminPrice and approved status
  product.adminPrice = adminPrice;
  product.isApproved = true;
  await product.save();

  res.status(200).json({ message: 'Product approved successfully', product });
});


const upadateProductprice = asyncHandler(async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId } = req.body;
  const { adminPrice } = req.body;
  

  // Find the product
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  // Update the product with adminPrice
  product.adminPrice = adminPrice;
  await product.save();

  res.status(200).json({ message: 'Product price updated successfully', product });
});



module.exports = {
  createProduct,
  getProducts,
  getProductForApproval,
  getProductsforseller,
  approveProduct,
  upadateProductprice
};
