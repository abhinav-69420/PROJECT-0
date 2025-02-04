import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import navicon from '../../assets/shopy.svg';
import Swal from 'sweetalert2'


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
        Swal.fire({
          title: "Login success...",
          icon: "success",
          draggable: true
        });
        navigate("/");
      } else {
        setmessage(data.message || "Login Failed");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      setmessage("Login Failed");
    }
  };
  return (
    <>
    <Navbar />
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-8 h-8 mr-2"
        src={navicon}
        alt="logo"
      />
      Shopy
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handlesubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="text"
              name="user-name"
              value={usernameOremail}
              onChange={(e) => setUsernameOremail(e.target.value)}
              id="user-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email or username"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="user-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a
              href="signupbuyer"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </a>
          </p>
        </form>
              </div>
    </div>
  </div>
</section>


    </>
  );
}

export default Login;
