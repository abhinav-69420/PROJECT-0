import React from 'react'

function Navbarseller() {
  return (
    <>
        <div className="navbar">
            <nav>
                <a href="#" className="home">
                    Shopy
                </a>
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
                    <li>
                        <a href="#">Login</a>
                    </li>

                    <li>
                        <a href="#">Profile</a>
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}

export default Navbarseller