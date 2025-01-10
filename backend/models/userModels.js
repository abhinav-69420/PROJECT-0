const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  // userId: {
  //     type:String,
  //     required: true,
  //     unique: true
  // },
//create a new model for admin and normal users cause dont need this much info on them
  role: {
    type: String,
    required: true,
    enum: ["admin", "seller", "buyer"],
    default: "buyer",
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: false,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
    trim: true,
  },
  address: [
    {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pin: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
