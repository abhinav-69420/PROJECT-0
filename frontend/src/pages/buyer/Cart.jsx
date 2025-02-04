import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div className="cart-container mt-28 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-body flex flex-col sm:flex-row gap-8">
          <div className="cart-items flex-1">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="item-image flex justify-center sm:w-48">
                  {item.productId.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000/uploads/${image}`}
                      alt={item.productId.name}
                      className="w-48 h-40 object-cover rounded-md"
                    />
                  ))}
                </div>
                <div className="item-details flex-1">
                  <h3 className="text-xl font-semibold">{item.productId.name}</h3>
                  <p className="text-lg text-gray-600 mt-2">Price: ₹{item.productId.adminPrice}</p>
                  <div className="quantity-control flex items-center gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId._id, item.quantity - 1)
                      }
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId._id, item.quantity + 1)
                      }
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold mt-4">
                    Total: ₹{item.productId.adminPrice * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.productId._id)}
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary sm:w-64 bg-white p-6 rounded-lg shadow-lg mt-8 sm:mt-0">
            <h2 className="text-2xl font-semibold mb-4">PRICE DETAILS</h2>
            <hr className="border-t-2 border-gray-300 mb-4" />
            <div className="summary-details space-y-2">
              <p>Subtotal: ₹{subtotal}</p>
              <p>Tax Amount: ₹{taxAmount}</p>
              <p>Shipping Fee: ₹{shippingFee}</p>
              <hr className="border-t-2 border-gray-300 my-4" />
              <p className="text-xl font-bold text-black">Total: ₹{total}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default Cart;
