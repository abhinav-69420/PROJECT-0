import React, { useEffect, useState } from "react"; // Importing React and hooks
import { useParams } from "react-router-dom"; // Importing useParams for route parameters
import "./Cart.css"; // Importing CSS for styling
import axios from "axios"; // Importing axios for making HTTP requests
import Navbar from "../../components/Navbar"; // Importing Navbar component

// Cart component to manage the shopping cart functionality
const Cart = () => {
  const params = useParams(); // Getting route parameters
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [subtotal, setSubtotal] = useState(0); // State for subtotal amount
  const [taxAmount, setTaxAmount] = useState(0); // State for tax amount
  const [shippingFee, setShippingFee] = useState(0); // State for shipping fee
  const [total, setTotal] = useState(0); // State for total amount
  const token = localStorage.getItem("token"); // Retrieving token from local storage

  // Fetch cart data from the server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart/getcart", {
          headers: {
            Authorization: `Bearer ${token}`, // Setting authorization header
          },
        });

        // Log the response data for debugging
        console.log("API Response:", response.data);

        // Validate the response data structure
        if (response.data && response.data.cart) {
          setCartItems(response.data.cart.cartItems); // Setting cart items
          setSubtotal(response.data.cart.subtotal); // Setting subtotal
          setTaxAmount(response.data.cart.taxAmount); // Setting tax amount
          setShippingFee(response.data.cart.shippingFee); // Setting shipping fee
          setTotal(response.data.cart.total); // Setting total
        } else {
          console.error("Invalid cart data format:", response.data);
          setCartItems([]); // Set to empty array if data is invalid
          setSubtotal(0); // Reset subtotal to 0
          setTaxAmount(0); // Reset tax amount to 0
          setShippingFee(0); // Reset shipping fee to 0
          setTotal(0); // Reset total to 0
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]); // Set to empty array on error
        setSubtotal(0); // Reset subtotal to 0
        setTaxAmount(0); // Reset tax amount to 0
        setShippingFee(0); // Reset shipping fee to 0
        setTotal(0); // Reset total to 0
      }
    };
    fetchCart(); // Call the fetch function
  }, [token]);

  // Handle quantity change for an item
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity } : item // Update quantity for the item
    );
    setCartItems(updatedCart); // Update cart items state
    calculateTotal(updatedCart); // Recalculate total
  };

  // Calculate total, subtotal, tax, and shipping fee
  const calculateTotal = (cartItems) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.productId.adminPrice * item.quantity,
      0
    );
    const taxAmount = subtotal * 0.1; // Example tax calculation
    const shippingFee = 50; // Example shipping fee
    const total = subtotal + taxAmount + shippingFee; // Total calculation

    setSubtotal(subtotal); // Update subtotal state
    setTaxAmount(taxAmount); // Update tax amount state
    setShippingFee(shippingFee); // Update shipping fee state
    setTotal(total); // Update total state
  };

  return (
    <>
      <Navbar /> {/* Render Navbar */}
      <div className="cart-container" style={{ marginTop: "110px" }}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p> // Message for empty cart
        ) : (
          <div className="cart-body">
            <div className="cart-items">
              {Array.isArray(cartItems) &&
                cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-image">
                      {item.productId.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:3000/uploads/${image}`}
                          alt={item.productId.name}
                          style={{
                            width: "200px",
                            height: "170px",
                          }}
                        />
                      ))}
                    </div>
                    <div className="item-details">
                      <h3>{item.productId.name}</h3>
                      <p>Price: ₹{item.productId.adminPrice}</p>
                      <div className="quantity-control">
                        <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      <p>Total: ₹{item.productId.adminPrice * item.quantity}</p>
                      <button className="remove-button"> <a href="">Remove</a></button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <h2>PRICE DETAILS</h2>
              <hr />
              <div className="summary-details">
                <p>Subtotal:₹{subtotal}</p>
                <p>Tax Amount :₹{taxAmount}</p>
                <p>Shipping Fee: ₹{shippingFee}</p>
                <h1 style={{
                  marginLeft:"-28px",
                  fontSize: "18px",
                  color: "rgb(222, 224, 226)"
                }}>.................................................................................</h1>
                <p style={{
                  fontSize: "20px",
                  color:"black",
                  fontWeight:"550"
                }}>Total :₹{total}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart; // Exporting Cart component
