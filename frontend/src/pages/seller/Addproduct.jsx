import React, { useState } from 'react';
import Navbarseller from '../../components/Navbarseller';
import axios from 'axios';
import Swal from 'sweetalert2'
function Addproduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category:'',
    sellerPrice:'',
    quantity:'',
    image:null,
    stock:''

  });
console.log(formData);

  const handleChange = (e) => {
    
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };
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


  const handleSubmit = async(e) => {
    e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("sellerPrice", formData.sellerPrice);
        data.append("quantity", formData.quantity);
        data.append("stock", formData.stock);
        if (formData.image) {
          data.append("images", formData.image); 
        }
    try {
        const token = localStorage.getItem('token');
        if(!token){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Plz..Login",
          });
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
        Swal.fire({
          icon: "success",
          title: "Product created successfully",
          text: "Product created successfully",
          });
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
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            }
            else if (error.request) {
                console.error('No response received:', error.request);
                alert('Error creating product: No response from the server');
              } else {
                console.error('Request setup error:', error.message);
                Swal.fire({
                  title: "Product Added",
                  icon: "success",
                  draggable: true
                });

        }
      }
    };  

  return (
    <>
    <Navbarseller />
    <div className="flex justify-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Seller Price */}
          <div>
            <label htmlFor="sellerPrice" className="block font-medium mb-1">
              Seller Price:
            </label>
            <input
              type="number"
              id="sellerPrice"
              name="sellerPrice"
              value={formData.sellerPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block font-medium mb-1">
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block font-medium mb-1">
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label htmlFor="images" className="block font-medium mb-1">
            Images:
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  </>
  );
}

export default Addproduct;