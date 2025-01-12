const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModels");

async function signup(req, res) {
  try {
    const {
      email,
      password,
      username,
      firstname,
      lastname,
      phoneNo,
      address,
      city,
      state,
      pin,
      country,
      role,
    } = req.body;

    const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
 else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = new Users({
        username: username,
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        phoneNo: phoneNo,
        address: address,
        city: city,
        state: state,
        pin: pin,
        country: country,
        role: role,
      });
      const newUser = await userData.save();
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(201).json({ message: "account created", token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
    try {
      const { usernameOremail, password } = req.body;
      console.log(req.body);
      
  
      const user = await Users.findOne({
        $or: [{ username: usernameOremail }, { email: usernameOremail }],
      });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials for username' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials for password' });
      }
  
      // Generate JWT (implement your own JWT strategy or use a library)
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
      res.status(200).json({ token, user: { username: user.username, role: user.role } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // ... other user-related controllers (e.g., getUser, updateUser, deleteUser)

// api for getting user
// takes info from auth middleware
  const getUser = async (req, res) => {
    try {
      const { userId } = req.user; 
      const user = await Users.findById(userId)
        .select('-password'); // Exclude password from response
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };

  //code to update 
  const updateUser = async (req, res) => {
    try {
      const { userId } = req.user;
      const updates = req.body; 
  
      // Exclude password from updates if provided
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
  
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'value updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
  

  //code to delete users
  const deleteUser = async (req, res) => {
    try {
      const { userId } = req.user;
  
      const deletedUser = await Users.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  };
   
  
  
  

module.exports = {
  signup,
  loginUser,
  getUser,
  updateUser,
  deleteUser
};
