import React, { useState } from "react";
import "./Loginbuyer.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Login() {
  const [usernameOremail, setUsernameOremail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/buyer/loginbuyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOremail, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);

        setUsernameOremail("");
        setPassword("");

        setmessage(data.message || "Login Successful");
        alert("Login Successful");
        navigate("/");
      } else {
        setmessage(data.message || "Login Failed");
        alert("Login Failed");
      }
    } catch (error) {
      setmessage("Login Failed");
    }
  };
  return (
    <>
    <Navbar />
      <div className="buyerlg-container">
        <div className="buyerlg-login-form">
          <div className="buyerlg-login-form-fields">
            <div className="buyerlg-login-input-group">
              <div className="buyerlg-name-password-login-button">
                {/* User Icon */}
                <form onSubmit={handlesubmit}>
                  {/* Name Field */}
                  <div className="buyerlg-name">
                    <input
                      type="text"
                      name="user-name"
                      id="user-name"
                      placeholder=" Email or username"
                      value={usernameOremail}
                      onChange={(e) => setUsernameOremail(e.target.value)}
                    />
                  </div>
                  {/* Password Field */}
                  <div className="buyerlg-password">
                    <input
                      type="password"
                      name="password"
                      id="user-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* Login Button Field */}
                  <div className="buyerlg-login-btn">
                    <button type="submit">Log In</button>
                  </div>
                </form>

                {message && <p className="buyerlg-message">{message}</p>}

                {/* Forget Password and Sign Up Field */}
                <div className="buyerlg-forget-password-sign-up-container">
                  <div className="buyerlg-forget-password">
                    <a href="#">Forget Password?</a>
                  </div>
                  <div className="buyerlg-sign-up">
                    <a href="#">Sign Up</a>
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

export default Login;
