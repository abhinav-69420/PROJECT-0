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
          "http://localhost:3000/order/history",
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
      const response = await axios.put(
        `http://localhost:3000/order/${orderId}/status`,
        { status: newStatus },
        {
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
    }
  };

  return (
    <>
    <div className="flex flex-col md:flex-row">
  <aside className="w-full md:w-64 bg-gray-800 text-white p-4 md:p-6 h-auto md:h-screen">
    <Navbaradmin />
  </aside>

  <div className="container mx-auto p-4 md:p-6">
    <h1 className="text-2xl font-semibold text-center mb-4 md:mb-6">
      Order List
    </h1>

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2 md:p-3">Order ID</th>
            <th className="border p-2 md:p-3">Buyer ID</th>
            <th className="border p-2 md:p-3">Order Items</th>
            <th className="border p-2 md:p-3">Total</th>
            <th className="border p-2 md:p-3">Status</th>
            <th className="border p-2 md:p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border">
              <td className="border p-2 md:p-3 text-xs md:text-base">
                {order._id}
              </td>
              <td className="border p-2 md:p-3 text-xs md:text-base">
                {order.buyerId}
              </td>
              <td className="border p-2 md:p-3 text-xs md:text-base">
                {order.orderItems.map((item) => (
                  <div key={item.productId}>
                    {item.name} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td className="border p-2 md:p-3 text-xs md:text-base">
                ₹{order.total.toFixed(2)}
              </td>
              <td className="border p-2 md:p-3 text-xs md:text-base">
                {order.orderStatus}
              </td>
              <td className="border p-2 md:p-3">
                <select
                  className="p-1 md:p-2 border rounded-md text-xs md:text-base"
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleOrderStatus(order._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </>
  );
}

export default OrderPageForAdmin;
