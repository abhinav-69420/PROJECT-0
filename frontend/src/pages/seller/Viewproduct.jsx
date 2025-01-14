import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarseller from '../../components/Navbarseller';
import '../seller/Viewproduct.css';


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
      <Navbarseller />
      <div className="product-container">
        <h1>Product List</h1>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th>Seller Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                <img
                    src={`http://localhost:3000/uploads/${product?.images}`}  alt={product.name}
                    className="product-image"                   
                />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.stock}</td>
                <td>₹{product.sellerPrice.toFixed(2)}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Viewproduct;