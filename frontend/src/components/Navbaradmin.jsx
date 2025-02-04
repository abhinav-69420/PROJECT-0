import React from 'react'
import navicon from '../assets/shopy.svg'
import profilePic from '../assets/avathar.svg'
import { Link } from 'react-router-dom'

function Navbaradmin() {
  return (
    <>
      <div className="h-screen w-64 bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-5">
      <div className="flex items-center space-x-3 mb-10">
        <img src={navicon} className="h-8" alt="Shopy Logo" />
        <span className="text-2xl font-semibold">Shopy</span>
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/getproductforadmin" className="block py-2 px-4 rounded-md hover:bg-gray-700">
            View Products
          </Link>
        </li>
        <li>
          <Link to="/orderpageforadmin" className="block py-2 px-4 rounded-md hover:bg-gray-700">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/loginAdmin" className="block py-2 px-4 rounded-md hover:bg-gray-700">
            Login
          </Link>
        </li>
      </ul>
    </div>
    </>
  )
}

export default Navbaradmin