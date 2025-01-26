import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OrderpageSeller() {
    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/orders');               
            } catch (error) {

            }

    })
  return (
    <>

    </>
  )
}

export default OrderpageSeller