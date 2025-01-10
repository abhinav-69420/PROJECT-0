import React, { useState } from 'react';
import Navbarseller from '../../components/Navbarseller';
import './Addproduct.css'

function Addproduct() {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category:'',
    sellerPrice:'',
    quantity:'',
    image:'',
    // Add more fields as needed
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    const files = e.target.files;
    // Handle file upload logic here
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/products', formData);
        console.log('Product created successfully:', response.data);
        // Clear form or display success message
      } catch (error) {
        console.error(error);
        alert('Error creating product: ' + error.response?.data?.message);
      }
    };  

  return (
    <>
    <Navbarseller/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=" category"> category:</label>
         <input
            type="text"
            id=" category"
            name=" category"
            value={formData. category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sellerPrice">SellerPrice:</label>
         <input
            type="number"
            id="sellerPrice"
            name="sellerPrice"
            value={formData.sellerPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">quantity:</label>
            <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        {/* Add more input fields for category, sellerPrice, quantity */}
        <div>
          <label htmlFor="images">Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </>
  );
}

export default Addproduct;