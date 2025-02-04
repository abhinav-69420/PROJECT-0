import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

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
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
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
      Swal.fire({
        title: "Account Created",
        icon: "success",
        draggable: true
      });
      navigate("/loginbuyer");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from--800 to--500 lg:h-screen p-6">
      <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from--300 to--500 w-full h-full">
          <div className="max-w-md space-y-12 mx-auto">
            <div>
              <h4 className="text-black text-lg font-semibold">
                Create Your Account
              </h4>
              <p className="text-[13px] text-black-200 mt-2">
                Welcome to our registration page! Get started by creating your
                account.
              </p>
            </div>
            <div>
              <h4 className="text-black text-lg font-semibold">
                Simple & Secure Registration
              </h4>
              <p className="text-[13px] text-black-200 mt-2">
                Our registration process is designed to be straightforward and
                secure. We prioritize your privacy and data security.
              </p>
            </div>
            <div>
              <h4 className="text-black text-lg font-semibold">
                Terms and Conditions Agreement
              </h4>
              <p className="text-[13px] text-black-200 mt-2">
                Require users to accept the terms and conditions of your service
                during registration.
              </p>
            </div>
          </div>
        </div>

        <form className="sm:p-8 p-4 w-full" onSubmit={handleSubmit}>
          <div className="md:mb-12 mb-8">
            <h3 className="text-gray-800 text-3xl font-bold">Register</h3>
            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                First Name
              </label>
              <input
                name="firstname"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                placeholder="Enter name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Last Name
              </label>
              <input
                name="lastname"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                placeholder="Enter last name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                User name
              </label>
              <input
                name="username"
                type="text"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Mobile No.
              </label>
              <input
                name="phoneNo"
                type="number"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                placeholder="Enter mobile number"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">street</label>
              <input
                 type="text"
                 name="address.street"
                 placeholder="Street"
                 value={formData.address.street}
                 onChange={handleChange}                
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
            <input type="number" name="address.pin" placeholder="Pincode"  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
            value={formData.address.pin}
            onChange={handleChange} />
            <select name="address.state" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
            value={formData.address.state}
            onChange={handleChange}
            >
              <option value="">Select State</option>
              <option value="california">California</option>
              <option value="texas">Texas</option>
            </select>
          </div>
            <div>
            <select
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all"
              required
            >
               <option value="">Select Country</option>
              <option value="usa">United States</option>
              <option value="india">India</option>
            </select>             
            </div>
          </div>

          <div className="flex items-center mt-6">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 shrink-0 rounded"
              onChange={handleChange}
            />
            <label htmlFor="terms" className="ml-3 block text-sm">
              I accept the{" "}
              <a
                href="#"
                className="text-blue-500 font-semibold hover:underline ml-1"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="py-3 px-6 text-sm tracking-wide rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none transition-all"
            >
              Sign up
            </button>
            <p className="text-xs pt-2">
              Already have an account?
              <Link to="/loginbuyer">
                <span className="text-blue-500"> Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
