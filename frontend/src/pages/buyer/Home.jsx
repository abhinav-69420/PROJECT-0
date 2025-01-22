import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import './Homepage.css'
import placeholderImage from '../../assets/image.png'

function Home() {
  const [products, setProducts] = useState([]);

  // Fetch approved products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product/getproduct');

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setProducts([]);
        }
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products: ' + error.response?.data?.message);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem('token'); // Retrieve the token

    if (!token) {
      alert('You must be logged in to add items to the cart.');
      return;
    }
    console.log(product._id);
    
    try {
      const response = await axios.post(
        'http://localhost:3000/cart/addtocart',
        {
          productId: product._id,
          quantity: 1,
        },
        
        {
          headers: {
            Authorization : `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
    

      if (response.status === 200) {
        console.log('Product added to cart successfully');
        //fetchCartItems(); // Refresh the cart items after adding
      } else {
        console.error('Error adding product to cart:', response.data);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart: ' + error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="mainpart">
        <div className="maincart">
          {products.map((product) => (
            <div key={product._id} className="container">
              <img src={product?.images ? `http://localhost:3000/uploads/${product.images}` : placeholderImage} alt="Product" />
              <h3>{product.name}</h3>
              {/* <h4>{product.description}</h4> */}
              <h6>₹{(product.adminPrice ?? product.sellerPrice).toFixed(2)}</h6>
              <button className="btn btn-primary" onClick={() => addToCart(product)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;
