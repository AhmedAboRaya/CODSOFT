/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartCard from "../../ui/CartCard";
import axios from "axios";
import { host } from "../../host.js"; // Ensure this points to your API base URL

const Cart = ({ setCartItems }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");

      if (!token || !userId) {
        setAuthError(true);
        return;
      }

      try {
        const response = await axios.get(`${host}/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setItems(response.data.items); // Assuming the items are in response.data.items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  if (authError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          You need to log in to view your cart.
        </h2>
        <Link to="/login">
          <button className="btn mt-3 btn-primary">Go to Login</button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Your cart is empty or there was an error loading your cart.</p>
        <Link to="/">
          <button className="btn mt-3 btn-primary">Shopping Now</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <li key={item.id}>
              <CartCard
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                count={item.count}
                setCartItems={setCartItems}
                items={items}
              />
            </li>
          ))}
        </ul>
        <div className="total-price mt-6 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
