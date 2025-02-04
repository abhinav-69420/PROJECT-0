import React, { useEffect, useState } from 'react';
import Navbaradmin from '../../components/Navbaradmin';
import axios from 'axios';

function Viewproducts() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [newPrices, setNewPrices] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/product/getproductapproval', {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [refresh]);

  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/product/approveproduct',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== productId));
        setApprovedProducts([...approvedProducts, products.find((p) => p._id === productId)]);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  const handlePriceChange = (productId, newPrice) => {
    setNewPrices((prevPrices) => ({ ...prevPrices, [productId]: newPrice }));
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
        { productId, newPrice: parseFloat(newPrice) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Price updated successfully!');
        setRefresh((prev) => !prev);
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
      <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-6 h-screen">
        <Navbaradmin/>
      </aside>
      <div className="flex-1 container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
        <div className="flex justify-center">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Seller Price</th>
                <th className="p-3 text-left">New Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">
                    <img src={`http://localhost:3000/uploads/${product?.images}`} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.description}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">₹{product.sellerPrice.toFixed(2)}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      placeholder="Enter new price"
                      value={newPrices[product._id] || ''}
                      onChange={(e) => handlePriceChange(product._id, e.target.value)}
                    />
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleApprove(product._id)}>
                      Approve
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleUpdatePrice(product._id)}>
                      Update Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="text-2xl font-bold mt-8 text-center">Approved Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {approvedProducts.map((product) => (
            <div key={product._id} className="border rounded p-4 shadow-lg">
              <img src={`http://localhost:3000/uploads/${product?.images}`} alt={product.name} className="w-full h-40 object-cover" />
              <h3 className="text-lg font-bold mt-2 text-center">{product.name}</h3>
              <h4 className="text-sm text-gray-600 text-center">{product.description}</h4>
              <h6 className="text-lg font-semibold text-center">₹{product.sellerPrice.toFixed(2)}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Viewproducts;
