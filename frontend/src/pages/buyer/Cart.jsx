import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart/getcart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.cart) {
          const { cartItems, subtotal, taxAmount, shippingFee, total } = response.data.cart;
          setCartItems(cartItems);
          setSubtotal(subtotal);
          setTaxAmount(taxAmount);
          setShippingFee(shippingFee);
          setTotal(total);
        } else {
          resetCart();
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        resetCart();
      }
    };

    fetchCart();
  }, [token]);

  const resetCart = () => {
    setCartItems([]);
    setSubtotal(0);
    setTaxAmount(0);
    setShippingFee(0);
    setTotal(0);
  };

  const updateCartState = (updatedCart) => {
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const item = cartItems.find((item) => item.productId._id === id);
    if (!item || newQuantity <= 0) return;

    const action = newQuantity > item.quantity ? "increment" : "decrement";

    try {
      await axios.put(
        "http://localhost:3000/cart/updatequantity",
        { productId: id, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCart = cartItems.map((item) =>
        item.productId._id === id ? { ...item, quantity: newQuantity } : item
      );

      updateCartState(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete("http://localhost:3000/cart/removefromcart", {
        data: { productId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCart = cartItems.filter((item) => item.productId._id !== id);
      updateCartState(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = (cartItems) => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.productId.adminPrice * item.quantity,
      0
    );
    const taxAmount = subtotal * 0.1;
    const shippingFee = 50;
    const total = subtotal + taxAmount + shippingFee;

    setSubtotal(subtotal);
    setTaxAmount(taxAmount);
    setShippingFee(shippingFee);
    setTotal(total);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container" style={{ marginTop: "110px" }}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-body">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    {item.productId.images.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:3000/uploads/${image}`}
                        alt={item.productId.name}
                        style={{ width: "200px", height: "170px" }}
                      />
                    ))}
                  </div>
                  <div className="item-details">
                    <h3>{item.productId.name}</h3>
                    <p>Price: ₹{item.productId.adminPrice}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>Total: ₹{item.productId.adminPrice * item.quantity}</p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveItem(item.productId._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>PRICE DETAILS</h2>
              <hr />
              <div className="summary-details">
                <p>Subtotal: ₹{subtotal}</p>
                <p>Tax Amount: ₹{taxAmount}</p>
                <p>Shipping Fee: ₹{shippingFee}</p>
                <hr />
                <p style={{ fontSize: "20px", fontWeight: "550" }}>Total: ₹{total}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
