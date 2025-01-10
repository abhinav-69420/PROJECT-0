import React from "react";
import "./Signup.css";
import Navbar from "../../components/Navbar";

function Signup() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="login-form">
          <div className="login-form-fields">
            <div className="login-input-group">
              <div className="name-password-login-button">
                {/* User Icon */}
                <form>
                  {/* Name Field */}
                  <div className="firstname">
                    <div className="name">
                      <input
                        type="text"
                        name="user-name"
                        id="user-name"
                        placeholder="First name"
                      />
                    </div>
                    <div className="name">
                      <input
                        type="text"
                        name="user-name"
                        id="user-name"
                        placeholder="Lastname"
                      />
                    </div>
                  </div>
                  <div className="username">
                    <div className="name">
                      <input
                        type="text"
                        name="user-name"
                        id="user-name"
                        placeholder="Username"
                      />
                    </div>
                    {/* Password Field */}
                    <div className="password">
                      <input
                        type="password"
                        name="password"
                        id="user-password"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="firstname">
                    <div className="name">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
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
                          placeholder="phoneNo"
                          className="search-item"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Street Field */}
                  <div className="firstname" style={{marginRight:"110px"}}>
                    <div className="name">
                      <input
                        type="text"
                        name="street"
                        id="street"
                        placeholder="Street"
                      />
                    </div>

                  {/* State Field */}
                    <div className="name">
                      <select name="state" id="state" className="drop1">
                        <option value="">Select State</option>
                        <option value="california">California</option>
                        <option value="texas">Texas</option>
                        <option value="new-york">New York</option>
                        <option value="florida">Florida</option>
                      </select>
                  </div>
                  </div>

                  {/* Country Field */}
                  <div className="firstname" style={{marginLeft:"10px"}}>
                    <div className="name">
                      <select name="country" id="country" className="drop1" style={{width:"220px"}}>
                        <option value="">Select Country</option>
                        <option value="usa">United States</option>
                        <option value="india">India</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                      </select>
                    </div>

                  {/* Pincode Field */}
                    <div className="name">
                      <input
                        type="number"
                        name="pincode"
                        id="pincode"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  {/* Login Button Field */}
                  <div className="login-btn">
                    <button type="submit">Sign up</button>
                  </div>
                </form>
                {/* Forget Password and Sign Up Field */}
                <div className="forget-password-sign-up-container">
                  <div className="forget-password">
                    <a href="#">Already have an account?</a>
                  </div>
                  <div className="sign-up">
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
