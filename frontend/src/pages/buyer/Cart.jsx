import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Cart.css";
import axios from "axios";

const Cart = () => {
  const params = useParams();
  const id = params.id;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  // Fetch cart items from the server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.cart);
        calculateTotal(response.data.cart); // Calculate total after fetching cart items
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();
  }, [token]);

  // Calculate the total price of items in the cart
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.product_id.price * item.quantity,
      0
    );
    setTotal(total);
  };

  // Handle quantity change for an item
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product_id._id}>
                  <td>
                    <img
                      src={`http://localhost:3500/${item.product_id.image.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={item.product_id.name}
                    />
                    {item.product_id.name}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${item.product_id.price}</td>
                  <td>${item.product_id.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: ${total}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;