import React, { useState } from 'react';
import './SellerLogin.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usernameOremail, setUsernameOremail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/seller/loginseller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOremail, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const role = data.seller.role;
        

        setUsernameOremail("");
        setPassword("");
        setMessage(data.message || "Login Successful");
        alert("Login Successful");

        // Navigate based on the role
        if (role === 'seller') {
          navigate('/getproductforseller');
        } else if (role === 'admin') {
          navigate('/getproductforadmin');
        }
      } else {
        setMessage(data.message || "Login Failed");
        alert("Login Failed");
      }
    } catch (error) {
      setMessage("Login Failed");
    }
  }

  return (
    <>
      <div className="seller-containers">
        <div className="seller-login-forms">
          <div className="seller-login-form-field">
            <div className="seller-login-input-groupnew">
              <div className="seller-name-password-login-buttonnew">
                <form onSubmit={handleSubmit}>
                  <div className="seller-name">
                    <input
                      type="text"
                      name="user-name"
                      id="user-name"
                      placeholder=" Email or username"
                      value={usernameOremail}
                      onChange={(e) => setUsernameOremail(e.target.value)}
                    />
                  </div>
                  <div className="seller-password">
                    <input
                      type="password"
                      name="password"
                      id="user-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="seller-login-btn">
                    <button type="submit">Log In</button>
                  </div>
                </form>
                {message && <p className='seller-message'>{message}</p>}
                <div className="seller-forget-password-sign-up-container">
                  <div className="forget-password">
                    <a href="#">Forget Password?</a>
                  </div>
                  <div className="seller-sign-up">
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
