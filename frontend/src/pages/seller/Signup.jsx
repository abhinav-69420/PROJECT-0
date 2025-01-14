import React, { useState } from "react";
import "../seller/Signup.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData,setFormData] = useState({
    email: "",
    password: "",
    username:"",
  });
  const navigate = useNavigate("")

  const [message,setmessage] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      // Handle nested address fields
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      // Handle other fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
    const handlesubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/signup',formData);
        setmessage(response.data.message);
        formData.username = "",
        formData.email = "",
        formData.password = "" 
        alert(response.data.message);
        navigate('/login') 
      } catch (error) {
        setmessage(error.response?.data?.message || "something went wrong");  
      }
      };

  return (
    <>
      <div className="container">
        <div className="login-form">
          <div className="login-form-fields">
            <div className="login-input-group">
              <div className="name-password-login-button">
                {/* User Icon */}
                <form onSubmit={handlesubmit}> 
                  {/* Name Field */}
                  <div className="username">
                    <div className="namenew">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enterprise"
                        value={formData.username}
                        onChange={handlechange}
                      />
                    </div>
                    {/* Password Field */}
                    <div className="passwordnew">
                      <input
                        type="password"
                        name="password"
                        id="user-password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handlechange}
                      />
                    </div>
                  </div>

                  <div className="firstname">
                    <div className="namenew">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handlechange}
                      />
                    </div>
                  </div>

                  {/* Login Button Field */}
                  <div className="login-btnew">
                    <button type="submit">Sign up</button>
                  </div>
                </form>
                {message && <p>{message}</p>} 
                {/* Forget Password and Sign Up Field */}
                <div className="forget-password-sign-up-containernew">
                  <div className="forget-passwordnew">
                    <a href="#">Already have an account?</a>
                  </div>
                  <div className="sign-upnew">
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