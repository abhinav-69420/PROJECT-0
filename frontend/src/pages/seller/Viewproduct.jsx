import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarseller from '../../components/Navbarseller';


function Viewproduct() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a refresh state
// console.log(products)
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/product/getproductforseller', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products: ' + error.response?.data?.message);
      }
    };
    fetchProducts();
  }, [refresh]); // Add refresh as a dependency

  return (
    <>

    <div className="flex">
      {/* Sidebar */}
      <Navbarseller />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-600 mb-8">
          Product List
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-left">Quantity</th>
                <th className="border p-3 text-left">Stock</th>
                <th className="border p-3 text-left">Seller Price</th>
                <th className="border p-3 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <td className="border p-3">
                    <img
                      src={`http://localhost:3000/uploads/${product?.images}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border p-3">{product.name}</td>
                  <td className="border p-3">{product.description}</td>
                  <td className="border p-3">{product.quantity}</td>
                  <td className="border p-3">{product.stock}</td>
                  <td className="border p-3">₹{product.sellerPrice.toFixed(2)}</td>
                  <td className="border p-3">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default Viewproduct;