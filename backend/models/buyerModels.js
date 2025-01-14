const mongoose = require("mongoose");
const buyerSchema = new mongoose.Schema({
  // userId: {
  //     type:String,
  //     required: true,
  //     unique: true
  // },
//create a new model for admin and normal users cause dont need this much info on them
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
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
const Buyers = mongoose.model("Buyers", buyerSchema);

module.exports = Buyers;
