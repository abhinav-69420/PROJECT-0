import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbarseller from "../../components/Navbarseller";
import Swal from 'sweetalert2'

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
        Swal.fire({
                title: "Account created",
                icon: "success",
                draggable: true
              });
      navigate("/loginseller");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
       Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
    }
  };

  return (
  
    <>
    <Navbarseller />
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">
          Seller Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enterprise"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && <p className="text-green-600 text-center mt-3">{message}</p>}

        {/* Login Link */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <p>Already have an account?</p>
          <Link to="/loginseller" className="hover:underline text-gray-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}

export default Signup;