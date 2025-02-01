import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbaradmin from "../../components/Navbaradmin";

function OrderPageForAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/order/getordersforadmin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert(
          "Error fetching orders: " +
            (error.response?.data?.message || "An unexpected error occurred")
        );
      }
    };
    fetchOrders();
  }, []);

  const handleOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:3000/orders/updatestatus",
        { orderId, status: newStatus ,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      alert("Order status updated");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status: " + (error.response?.data?.message || "An unexpected error occurred"));
    }
  };
  return (
    <>
    <Navbaradmin/>
      <div className="order-container">
        <h1>Order List</h1>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer ID</th>
              <th>Order Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.buyerId}</td>
                <td>
                  {order.orderItems.map((item) => (
                    <div key={item.productId}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>
                    <select name="" id="" value={order.orderStatus}
                    onChange={(e) => handleOrderStatus(order._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                    </select>
                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderPageForAdmin;
