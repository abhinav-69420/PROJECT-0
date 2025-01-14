import React from 'react'

function Navbaradmin() {
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
              <a href="/getproductforadmin">viewproduct</a>
            </li>
            <li>
              <a href="#">orders</a>
            </li>
            <li >
              <a href="#" className="text-yellow-600">Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbaradmin