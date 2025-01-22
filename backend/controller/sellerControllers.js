const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModels");
const Buyer = require("../models/buyerModels")

// Signup Seller
const signupSeller = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ $or: [{ username }, { email }] });
    if (existingSeller) {
      return res.status(400).json({ message: "user already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new seller
    const newSeller = new Seller({
      username,
      email,
      password: hashedPassword,
      role: role || "seller", // Default role is 'seller'
    });

    // Save the seller to the database
    await newSeller.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newSeller._id, email: newSeller.email, role: newSeller.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "User account created successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Seller
const loginSeller = async (req, res) => {
  try {
    const { usernameOremail, password } = req.body;

    // Find seller by username or email
    const seller = await Seller.findOne({
      $or: [{ username: usernameOremail }, { email: usernameOremail }],
    });

    if (!seller) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: seller._id, email: seller.email,role: seller.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, seller: { username: seller.username, email: seller.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Seller Details
const getSeller = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from auth middleware

    // Find seller by ID and exclude password
    const seller = await Seller.findById(userId).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Seller Details
const updateSeller = async (req, res) => {
  try {
    const { userId } = req.user;
    const updates = req.body;

    // Hash password if provided
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Update seller details
    const updatedSeller = await Seller.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true } // Return the updated document
    ).select("-password");

    if (!updatedSeller) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", seller: updatedSeller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Seller
const deleteSeller = async (req, res) => {
  try {
    const { userId } = req.user;

    // Delete seller by ID
    const deletedSeller = await Seller.findByIdAndDelete(userId);

    if (!deletedSeller) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View All Sellers (Admin Only)
const viewSellers = async (req, res) => {
    try {
      // Fetch all sellers from the database
      const sellers = await Seller.find().select("-password"); // Exclude passwords
  
      res.status(200).json(sellers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// view all buyers (admin only)

const viewBuyers = async (req, res) => {
    try {
      // Fetch all sellers from the database
      const buyer = await Buyer.find().select("-password"); // Exclude passwords
  
      res.status(200).json(buyer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Exporting the controller functions
  module.exports = {
    signupSeller,
    loginSeller,
    getSeller,
    updateSeller,
    deleteSeller,
    viewSellers,
    viewBuyers
  };