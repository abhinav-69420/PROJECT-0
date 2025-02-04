import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbarseller from '../../components/Navbarseller';
import Swal from 'sweetalert2'

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
       Swal.fire({
                title: "Login success...",
                icon: "success",
                draggable: true
              });

        // Navigate based on the role
        if (role === 'seller') {
          navigate('/getproductforseller');
        } else if (role === 'admin') {
          navigate('/getproductforadmin');
        }
      } else {
        setMessage(data.message || "Login Failed");
       Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
                });
      }
    } catch (error) {
      setMessage("Login Failed");
    }
  }

  return (
    <>
    <Navbarseller />
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">
          Seller Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Username */}
          <div>
            <input
              type="text"
              name="user-name"
              id="user-name"
              placeholder="Email or Username"
              value={usernameOremail}
              onChange={(e) => setUsernameOremail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              id="user-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && <p className="text-green-600 text-center mt-3">{message}</p>}

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link to="/signupseller" className="hover:underline text-gray-900">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login;
