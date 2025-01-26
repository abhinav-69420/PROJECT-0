import React, { useState } from 'react';
import Navbarseller from '../../components/Navbarseller';
import './Addproduct.css'
import axios from 'axios';

function Addproduct() {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category:'',
    sellerPrice:'',
    quantity:'',
    image:null,
    stock:''
    // Add more fields as needed
  });
console.log(formData);

  // Handle form input changes
  const handleChange = (e) => {
    
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }

  };


  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
        // Create FormData for file upload
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("sellerPrice", formData.sellerPrice);
        data.append("quantity", formData.quantity);
        data.append("stock", formData.stock);
        if (formData.image) {
          data.append("images", formData.image); // Append the image file
        }
    try {
        const token = localStorage.getItem('token');
        if(!token){
            alert('No token found. Please log in.');
            return;
         }
        const response = await axios.post('http://localhost:3000/product/addproduct', data,
            {
                headers: {
                    Authorization:`Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        );
        console.log(data)
        console.log('Product created successfully:', response.data);
        alert('Product created successfully');
        setFormData({
            name: '',
            description: '',
            category: '',
            sellerPrice: '',
            quantity: '',
            stock: '',
            image: null,
        });
        
        // Clear form or display success message
      } catch (error) {
        if(error.response){
            console.log(error.response.data);
            alert('Error creating product: ' + (error.response.data.message || 'Unknown server error'));
            }
            else if (error.request) {
                console.error('No response received:', error.request);
                alert('Error creating product: No response from the server');
              } else {
                console.error('Request setup error:', error.message);
                alert('Error creating product: ' + error.message);

        }
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
            id="category"
            name="category"
            value={formData.category}
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
        <label htmlFor="stock">Stock:</label>
         <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
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
          <input type="file"
           multiple onChange={handleImageChange} 

          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </>
  );
}

export default Addproduct;