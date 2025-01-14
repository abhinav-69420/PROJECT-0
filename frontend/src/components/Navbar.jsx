import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <nav>
      <a href="/" className="home">
            Shopy <br />
            <a href="" className="home12">
              Explore <span>plus</span>{" "}
            </a>
          </a>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products, brands, and more..."
          />
        </div>
        <ul>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>

          <li>
            <a href="#">Profile</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;