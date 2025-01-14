const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Buyers = require("../models/buyerModels");
// eeeeeeeeeeeeeeee
async function signupbuyer(req, res) {
  try {
    const {
      email,
      password,
      username,
      firstname,
      lastname,
      phoneNo,
      address,
      street,
      city,
      state,
      pin,
      country,
    } = req.body;

    const existingUser = await Buyers.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
 else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const buyerData = new Buyers({
        username: username,
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        phoneNo: phoneNo,
        address: address,
        street: street,
        city: city,
        state: state,
        pin: pin,
        country: country,
      });
      const newBuyer = await buyerData.save();
      const token = jwt.sign(
        { userId: newBuyer._id, email: newBuyer.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(201).json({ message: "account created", token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginBuyer = async (req, res) => {
    try {
      const { usernameOremail, password } = req.body;
      console.log(req.body);
      
  
      const buyer = await Buyers.findOne({
        $or: [{ username: usernameOremail }, { email: usernameOremail }],
      });
  
      if (!buyer) {
        return res.status(401).json({ message: 'Invalid credentials for username' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, buyer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials for password' });
      }
  
      // Generate JWT (implement your own JWT strategy or use a library)
      const token = jwt.sign({ userId: buyer._id}, process.env.JWT_SECRET);
      res.status(200).json({ token, buyer: { username: buyer.username, email: buyer.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // ... other user-related controllers (e.g., getBuyer, updateBuyer, deleteBuyer)

// api for getting buyer
// takes info from auth middleware
  const getBuyer = async (req, res) => {
    try {
      const { userId } = req.user; 
      const buyer = await Buyers.findById(userId)
        .select('-password'); // Exclude password from response
  
      if (!buyer) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(buyer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };

  //code to update 
  const updateBuyer = async (req, res) => {
    try {
      const { userId } = req.user;
      const updates = req.body; 
  
      // Exclude password from updates if provided
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
  
      const updatedBuyer = await Buyers.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true } // Return the updated document
      );
  
      if (!updatedBuyer) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'value updated successfully', user: updatedBuyer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
  

  //code to delete users
  const deleteBuyer = async (req, res) => {
    try {
      const { userId } = req.user;
  
      const deletedBuyer = await Buyers.findByIdAndDelete(userId);
  
      if (!deletedBuyer) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
   
  
  
  

module.exports = {
  signupbuyer,
  loginBuyer,
  getBuyer,
  updateBuyer,
  deleteBuyer
};
