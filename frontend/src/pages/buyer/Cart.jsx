import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import Navbar from "../../components/Navbar";


const Cart = () => {
  const params = useParams();
  const id = params.id;
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  // Fetch cart data from the server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart/getcart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response data for debugging
        console.log("API Response:", response.data);

        // Validate the response data structure
        if (response.data && response.data.cart) {
          setCartItems(response.data.cart.cartItems);
          setSubtotal(response.data.cart.subtotal);
          setTaxAmount(response.data.cart.taxAmount);
          setShippingFee(response.data.cart.shippingFee);
          setTotal(response.data.cart.total);
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
    fetchCart();
  }, [token]);
  
  


  // // Handle quantity change for an item
  // const handleQuantityChange = (id, quantity) => {
  //   const updatedCart = cartItems.map((item) =>
  //     item.id === id ? { ...item, quantity } : item
  //   );
  //   setCartItems(updatedCart);
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   calculateTotal(updatedCart);
  // };


  return (
    <>
    <Navbar/>
    <div className="cart-container"style={{marginTop:"110px"}}>
      <h1>Shopping bag</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="full_body">
          <table className="cart-table">
            <thead>
              <tr>
                <th >Product</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
 </tr>
            </thead>
            <tbody style={{
              border:"0px solid black",
              padding:"10px",

              }}>
              {Array.isArray(cartItems) && cartItems.map((items) => (
                <tr key={items._id}>
                <td>
                  {items.productId.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/uploads/${image}`}
                      alt={items.productId.name}
                    style={{
                      width: "140px",
                      height: "140px",
                      marginLeft:"20px"
                    }}/>
                  ))}
                </td>
                <td>{items.productId.name}</td> 
                  <td>
                    {items.quantity}
                    
                  </td>
                  <td>₹{items.productId.adminPrice}
                  </td>
                  <td>₹{items.productId.adminPrice * items.quantity}</td>
                  <td>
                    <button>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <hr />
          </table>
          <div className="pera_dis">
            <h1>Cart total</h1>
            <div style={{
              marginTop:"30px"
            }}>
          <p>Subtotal: ₹{subtotal}</p>
          <p>Tax Amount: ₹{taxAmount}</p>
          <p>Shipping Fee: ₹{shippingFee}</p>         
          <p>Total: ₹{total}</p>
          </div>
          </div>
          
        </div>
      )}
      <div>
         
      </div>
    </div>
    </>
  );
};

export default Cart;