import React, { useEffect, useState } from 'react';
import Navbaradmin from '../../components/Navbaradmin';
import axios from 'axios';
import '../seller/Viewproduct.css';

function Viewproducts() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a refresh state
  const [approvedProducts, setApprovedProducts] = useState([]); // Add a state for approved products
  const [newPrices, setNewPrices] = useState({}); // State to track new prices for each product

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/product/getproductapproval', {
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

  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/product/approveproduct',
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log('Product approved successfully:', response.data);

        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
        // Update the approved products state
        const updatedApprovedProducts = [...approvedProducts];
        const productIndex = products.findIndex((product) => product._id === productId);
        if (productIndex !== -1) {
          updatedApprovedProducts.push(products[productIndex]);
          setApprovedProducts(updatedApprovedProducts);
        }
      } else {
        console.error('successfully:', response.data);
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  const handlePriceChange = (productId, newPrice) => {
    setNewPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: newPrice,
    }));
  };

  const handleUpdatePrice = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in.');
        return;
      }

      const newPrice = newPrices[productId];
      if (!newPrice || isNaN(newPrice)) {
        alert('Please enter a valid price.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/product/updateproductprice',
        {
          productId,
          newPrice: parseFloat(newPrice),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Price updated successfully!');
        setRefresh((prev) => !prev); // Refresh the product list
      } else {
        alert('Failed to update price: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Error updating price: ' + error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbaradmin />
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
              <th>New Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                <img
                    src={`http://localhost:3000/uploads/${product?.images}`}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.stock}</td>
                <td>₹{product.sellerPrice.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter new price"
                    value={newPrices[product._id] || ''}
                    onChange={(e) => handlePriceChange(product._id, e.target.value)}
                  />
                </td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(product._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="update-price-button"
                    onClick={() => handleUpdatePrice(product._id)}
                  >
                    Update Price
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mainpart">
        <h1>Approved Products</h1>
        <div className="maincart">
          {approvedProducts.map((product) => (
            <div key={product._id} className="container">
              <img
                src={`http://localhost:3000/uploads/${product?.images}`}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <h4>{product.description}</h4>
              <h6>₹{product.sellerPrice.toFixed(2)}</h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Viewproducts;