const Product = require("../models/productsModels");


const createProduct = async (req, res) => {
  try {
    const { userId } = req.user;
    

    const { name, description, category, sellerPrice, quantity } = req.body;
    const img = req.files.map(x => x.filename);
    

    const newProduct = new Product({
      sellerId: userId,      name,
      description,
      category,
      sellerPrice,
      quantity,
      images: img,
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
    console.log(products);
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const getProductForApproval = async (req, res) => {
  try {
    const products = await Product.find({ isApproved: false }).populate('sellerId', 'username'); 
    console.log(products);
    
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
    console.log(products);
    
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

//code to approve products *by Admin

const approveProduct = (req, res) => {
  const { productId } = req.params;
  const { adminPrice } = req.body;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.isApproved) {
        return res.status(400).json({ message: 'Product is already approved' });
      }

      product.adminPrice = adminPrice;
      product.isApproved = true;
      return product.save(); 
    })
    .then(updatedProduct => {
      res.status(200).json({ message: 'Product approved successfully', product: updatedProduct });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    });
};




module.exports = {
  createProduct,
  getProducts,
  getProductForApproval,
  getProductsforseller,
  approveProduct
};
