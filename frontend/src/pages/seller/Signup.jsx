import React, { useState } from "react";
import "../seller/Signup.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData,setFormData] = useState({
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    username:"",
    phoneNo:"",
    address:{
    city:"",
    state:"",
    country:"",
    pin:"",
    },
   role:"buyer"
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
        formData.address = "",
        formData.city = "",
        formData.state = "",
        formData.country = "",
        formData.pin = "",
        formData.role = "",
        formData.phoneNo = "",
        formData.username = "",
        formData.lastname = "",
        formData.firstname = "",
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
                  <div className="firstname">
                    <div className="namenew">
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="First name"
                        value={formData.firstname}
                        onChange={handlechange}
                      />
                    </div>
                    <div className="namenew">
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Lastname"
                        value={formData.lastname}
                        onChange={handlechange}
                      />
                    </div>
                  </div>
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
                    <div className="search-container">
                      <div className="detectionlocation">
                        <select name="State" id="state" className="drop">
                          <option value="">+91</option>
                          <option value="mumbai">+1</option>
                          <option value="goa">+31</option>
                          <option value="karnataka">+22</option>
                          <option value="utherpredhesh">+33</option>
                        </select>
                        <span>|</span>
                        <input
                          type="number"
                          name="phoneNo"
                          placeholder="phoneNo"
                          className="search-item"
                          value={formData.phoneNo}
                          onChange={handlechange}

                        />
                      </div>
                    </div>
                  </div>

                  {/* Street Field */}
                  <div className="firstname" style={{ marginRight: "110px" }}>
                    <div className="namenew">
                      <input
                        type="text"
                        name="street"
                        id="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handlechange}
                      />
                    </div>

                    {/* State Field */}
                    <div className="namenew">
                      <select name="state" id="state" className="drop1"
                      value={formData.state}
                      onChange={handlechange}
                      >
                        <option value="">Select State</option>
                        <option value="california">California</option>
                        <option value="texas">Texas</option>
                        <option value="new-york">New York</option>
                        <option value="florida">Florida</option>
                      </select>
                    </div>
                  </div>

                  {/* Country Field */}
                  <div className="firstname" style={{ marginLeft: "10px" }}>
                    <div className="namenew">
                      <select
                        name="country"
                        id="country"
                        className="drop1"
                        style={{ width: "220px" }}
                        value={formData.country}
                        onChange={handlechange}
                      >
                        <option value="">Select Country</option>
                        <option value="usa">United States</option>
                        <option value="india">India</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                      </select>
                    </div>

                    {/* Pincode Field */}
                    <div className="namenew">
                      <input
                        type="number"
                        name="pin"
                        id="pin"
                        placeholder="Pincode"
                        value={formData.pin}
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