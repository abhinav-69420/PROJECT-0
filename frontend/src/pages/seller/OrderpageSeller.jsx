import axios from 'axios';
import React, { useEffect, useState } from 'react';

function OrderpageSeller() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        setOrders(response.data);  // Save the fetched orders to the state
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders(); // Call the fetchOrders function
  }, []); // Empty dependency array means this will only run once when the component mounts

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map((order) => (
            <li key={order.id}>{order.name} - {order.status}</li>  // Assuming each order has id, name, and status
          ))
        )}
      </ul>
    </div>
  );
}

export default OrderpageSeller;
