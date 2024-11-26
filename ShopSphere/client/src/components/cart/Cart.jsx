/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import CartCard from "../../ui/CartCard";
// import axios from "axios";
// // import { host } from '../../host.js'; // Ensure this points to your API base URL

// const Cart = ({ setCartItems }) => {
//   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState([]);
//   const [isUser, setIsUser] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(null);
//   const [error, setError] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [authError, setAuthError] = useState(false);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");

//       if (!token || !userId) {
//         setAuthError(true);
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/auth/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response) {
//           setIsUser(response.data);
//         } else {
//           console.warn("User data not found in the response.");
//           setAuthError(true);
//           return;
//         }

//         setLoading(false);
//       } catch (error) {
//         console.log(error.request.statusText);
//         setAuthError(true);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     const fetchCartItems = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setItems(response.data.items);
//         console.log(items);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setError(true);
//         setLoading(false);
//       }
//     };
//     checkAuth();
//     fetchCartItems();
//   }, []);

//   useEffect(() => {
//     setTotalPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
//   }, [items, actionLoading]);

//   const handleIncrease = async (item) => {
//     setActionLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/api/cart/update`, {
//         userId: isUser._id,
//         productId: item.product._id,
//         change: 1,
//       });

//       setItems((prevItems) =>
//         prevItems.map((cartItem) =>
//           cartItem.product._id === item.product._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDecrease = async (item) => {
//     setActionLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/api/cart/update`, {
//         userId: isUser._id,
//         productId: item.product._id,
//         change: -1,
//       });

//       setItems((prevItems) =>
//         prevItems.map((cartItem) =>
//           cartItem.product._id === item.product._id
//             ? { ...cartItem, quantity: cartItem.quantity - 1 }
//             : cartItem
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDelete = async (item) => {
//     setActionLoading(true);
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/remove`, {
//         data: {
//           userId: isUser._id,
//           productId: item.product._id,
//         },
//       });

//       setItems((prevItems) =>
//         prevItems.filter(
//           (cartItem) => cartItem.product._id !== item.product._id
//         )
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (authError) {
//     return (
//       <div className="w-full h-screen flex flex-col items-center justify-center">
//         <h2 className="text-xl font-semibold">
//           You need to log in to view your cart.
//         </h2>
//         <Link to="/login">
//           <button className="btn mt-3 btn-primary">Go to Login</button>
//         </Link>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center w-full h-screen">
//         <span className="loading loading-ball loading-lg"></span>
//       </div>
//     );
//   }

//   if (error || items.length === 0) {
//     return (
//       <div className="text-center">
//         <p className="text-gray-600">
//           Your cart is empty or there was an error loading your cart.
//         </p>
//         <Link to="/">
//           <button className="btn mt-3 btn-primary">Shopping Now</button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col items-center p-6 bg-base-100 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       <div className="container">
//         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {items.map((item) => (
//             <li key={item.product._id}>
//               <CartCard
//                 id={item.product._id}
//                 imageUrl={item.product.images}
//                 title={item.product.name}
//                 price={item.product.price}
//                 count={item.quantity}
//                 setCartItems={setCartItems}
//                 item={item}
//                 handleIncrease={handleIncrease}
//                 handleDecrease={handleDecrease}
//                 handleDelete={handleDelete}
//                 actionLoading={actionLoading}
//               />
//             </li>
//           ))}
//         </ul>
//         <div className="total-price mt-6 p-4 rounded-lg flex flex-col md:flex-row justify-center md:justify-between md:items-center shadow-xl">
//           <h3 className="text-lg font-bold">Total Price: {totalPrice}$</h3>
//           <button className="btn btn-danger my-2" disabled={actionLoading}>
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Header from "../../ui/Header";
import Footer from "../../ui/Footer";
import Loader from "../../ui/Loader";
import axios from "axios";
// import { host } from '../../host.js';

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [tax, setTax] = useState(null);
  const [error, setError] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthError(true);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setIsUser(response.data);
        } else {
          console.warn("User data not found in the response.");
          setAuthError(true);
          return;
        }

        setLoading(false);
      } catch (error) {
        setAuthError(true);
        setError(error.data);
        setLoading(false);
      }
    };

    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data.items);
        setTotalPrice(items.reduce((sum, item) => sum + item.price, 0));
        setTax(totalPrice * 0.1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(true);
        setLoading(false);
      }
    };
    checkAuth();
    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const newTotalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      setTotalPrice(newTotalPrice);
      setTax(newTotalPrice * 0.1);
    };

    calculateTotals();
  }, [items]);

  const updateQuantity = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleChangeQuantity = async (id, value) => {
    setActionLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/cart/update`, {
        userId: isUser._id,
        productId: id,
        change: value,
      });
      updateQuantity(id, value);
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.product._id !== id));
  };

  const handleDeleteItem = async (id) => {
    setActionLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove`, {
        data: {
          userId: isUser._id,
          productId: id,
        },
      });

      removeItem(id);
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  if (authError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">
          You need to log in to view your cart.
        </h2>
        <Link to="/login">
          <Button className="mt-3">Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
            {items.length === 0 ? (
              <p>
                Your cart is empty.{" "}
                <Link to="/shop" className="text-blue-600 hover:underline">
                  Continue shopping
                </Link>
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 py-4 border-b"
                    >
                      <img
                        src={item.product.images}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleChangeQuantity(
                              item.product._id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16"
                          disabled={actionLoading}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.product._id)}
                          disabled={actionLoading}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(totalPrice + tax).toFixed(2)}</span>
                      </div>
                    </div>
                    <Link to="/checkout">
                      <Button className="w-full" disabled={actionLoading}>
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
