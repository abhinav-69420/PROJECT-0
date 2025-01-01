import React from "react";
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <a href="#" className="home">
                    Shopy
                </a>
                <ul>
                    <li>
                        <a href="#">Cart</a>
                    </li>
                    <li>
                        <a href="#">Products</a>
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
