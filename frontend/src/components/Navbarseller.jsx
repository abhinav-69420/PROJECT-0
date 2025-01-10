import React from "react";

function Navbarseller() {
  return (
    <>
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
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="/addproduct">Add Products</a>
            </li>
            <li>
              <a href="/viewproduct">View Products</a>
            </li>
            <li >
              <a href="#" className="text-yellow-600">Login</a>
            </li>

            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbarseller;