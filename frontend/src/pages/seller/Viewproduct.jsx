



// import React from 'react';
// import './Viewproduct.css'; 
// import Navbarseller from '../../components/Navbarseller';

// function Viewproduct() {
//   const products = [
//     {
//       id: 1,
//       image: "https://cdn.mos.cms.futurecdn.net/hf2CQvHr9KNtKuUSDkeQVH-320-80.jpg",
//       name: 'Product 1',
//       description: 'bla bla blaaa aaa baaa aa a',
//       quantity: 10,
//       stock:50,
//       price: 200,
//     },
//     {
//       id: 2,
//       image: "https://cdn.mos.cms.futurecdn.net/hf2CQvHr9KNtKuUSDkeQVH-320-80.jpg",
//       name: 'Product 2',
//       description: 'blaa   fbhvjv ghdmhfdvc d',
//       quantity: 5,
//       stock: 15,
//       price: 150,
//     },
//     {
//       id: 3,
//       image: "https://cdn.mos.cms.futurecdn.net/hf2CQvHr9KNtKuUSDkeQVH-320-80.jpg",
//       name: 'Product 3',
//       description: 'bghjjlg gkjgjf dhgfrygy',
//       quantity: 20,
//       stock: 30,
//       price: 250,
//     },
//   ];

//   return (
//     <>
//     <Navbarseller/>
//     <div className="product-container">
//       <h1>Product List</h1>
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Quantity</th>
//             <th>Stock</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 <img src={product.image} alt={product.name} className="product-image" />
//               </td>
//               <td>{product.name}</td>
//               <td>{product.description}</td>
//               <td>{product.quantity}</td>
//               <td>{product.stock}</td>
//               <td>${product.price.toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// }

// export default Viewproduct;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Viewproduct.css'; 
import Navbarseller from '../../components/Navbarseller';

function Viewproduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); 
        console.log('API Response:', response.data); 
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setProducts([]); 
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products: ' + error.response?.data?.message);
      }
    };
  
    fetchProducts();
  }, []);
  return (
    <>
      <Navbarseller/>
      <div className="product-container">
        <h1>Product List</h1>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} className="product-image" />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.stock}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Viewproduct;