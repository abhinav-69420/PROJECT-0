import React, { useState } from "react";
import "./Signupbuyer.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    phoneNo: "",
    address: {
      street: "",
      city: "",
      state: "",
      pin: "",
      country: "",
    },
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is part of the nested address object
    if (name.includes("address.")) {
      const key = name.split(".")[1]; // Get the nested key
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [key]: value, // Update the specific field in the address object
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Update the specific field in the state
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/buyer/signupbuyer",
        formData
      );
      setMessage(response.data.message);
      alert(response.data.message);
      navigate("/loginbuyer");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="buyer-container">
        <div className="buyer-login-form">
          <div className="buyer-login-form-fields">
            <div className="buyer-login-input-group">
              <div className="buyer-name-password-login-button">
                {/* User Icon */}
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="buyer-firstname">
                    <div className="buyer-name">
                      {/* Firstname and Lastname Fields */}
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First name"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Last name"
                        value={formData.lastname}
                        onChange={handleChange}
                      />

                      {/* Username Field */}
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                      />

                      {/* Email Field */}
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />

                      {/* Phone Number Field */}
                      <input
                        type="number"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Phone Number"
                        value={formData.phoneNo}
                        onChange={handleChange}
                      />

                      {/* Address Fields */}
                      <input
                        type="text"
                        name="address.street"
                        id="street"
                        placeholder="Street"
                        value={formData.address.street}
                        onChange={handleChange}
                      />
                      <select
                        name="address.state"
                        id="state"
                        value={formData.address.state}
                        onChange={handleChange}
                      >
                        <option value="">Select State</option>
                        <option value="california">California</option>
                        <option value="texas">Texas</option>
                      </select>
                      <input
                        type="number"
                        name="address.pin"
                        id="pincode"
                        placeholder="Pincode"
                        value={formData.address.pin}
                        onChange={handleChange}
                      />
                      <select
                        name="address.country"
                        id="country"
                        value={formData.address.country}
                        onChange={handleChange}
                      >
                        <option value="">Select Country</option>
                        <option value="usa">United States</option>
                        <option value="india">India</option>
                      </select>
                    </div>
                  </div>

                  {/* Login Button Field */}
                  <div className="buyer-login-btn">
                    <button type="submit">Sign up</button>
                  </div>
                </form>
                {/* Message Display */}
                {message && <p className="signup-message">{message}</p>}

                {/* Forget Password and Sign Up Field */}
                <div className="buyer-forget-password-sign-up-container">
                  <div className="buyer-forget-password">
                    <a href="#">Already have an account?</a>
                  </div>
                  <div className="buyer-sign-up">
                    <a href="#">Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
