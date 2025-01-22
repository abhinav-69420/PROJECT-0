import React, { useState } from "react";
import "../seller/SellerSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/seller/signupseller", formData);
      setMessage(response.data.message);
      alert(response.data.message);
      navigate("/loginseller");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-form-fields">
          <div className="signup-input-group">
            <div className="signup-fields">
              <form className="signup-form" onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="signup-username">
                  <div className="signup-name">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enterprise"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="signup-email">
                  <div className="signup-email-input">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="signup-password">
                  <input
                    type="password"
                    name="password"
                    id="user-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {/* Sign Up Button */}
                <div className="signup-button">
                  <button type="submit">Sign up</button>
                </div>
              </form>

              {/* Message Display */}
              {message && <p className="signup-message">{message}</p>}

              {/* Login Link */}
              <div className="signup-login-link">
                <div className="signup-login-text">
                  <a href="#">Already have an account?</a>
                </div>
                <div className="signup-login-button">
                  <a href="#">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;