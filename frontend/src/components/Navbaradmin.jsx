import React from 'react'

function Navbaradmin() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
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
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/">Products</a>
          </li>
           {/* Conditionally render the Login link */}
           {!isLoggedIn && (
            <li>
              <a href="/login">Login</a>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <a href="/profile">Profile</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
    </>
  )
}

export default Navbaradmin