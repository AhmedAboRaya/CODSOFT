/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartCard from "../../ui/CartCard";
import axios from "axios";
import { host } from "../../host.js"; // Ensure this points to your API base URL

const Cart = ({ setCartItems }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isUser, setIsUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [error, setError] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token || !userId) {
        setAuthError(true);
        return;
      }

      try {
        const response = await axios.get(`${host}/auth/profile`, {
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
        console.log(error.request.statusText);
        setAuthError(true);
        setError(true);
        setLoading(false);
      }
    };

    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${host}/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data.items);
        console.log(items);

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
    setTotalPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [items, actionLoading]);

  const handleIncrease = async (item) => {
    setActionLoading(true);
    try {
      await axios.put(`${host}/cart/update`, {
        userId: isUser._id,
        productId: item.product._id,
        change: 1,
      });

      setItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.product._id === item.product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecrease = async (item) => {
    setActionLoading(true);
    try {
      await axios.put(`${host}/cart/update`, {
        userId: isUser._id,
        productId: item.product._id,
        change: -1,
      });

      setItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.product._id === item.product._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (item) => {
    setActionLoading(true);
    try {
      await axios.delete(`${host}/cart/remove`, {
        data: {
          userId: isUser._id,
          productId: item.product._id,
        },
      });

      setItems((prevItems) =>
        prevItems.filter(
          (cartItem) => cartItem.product._id !== item.product._id
        )
      );
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
        <p className="text-gray-600">
          Your cart is empty or there was an error loading your cart.
        </p>
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
            <li key={item.product._id}>
              <CartCard
                id={item.product._id}
                imageUrl={item.product.images}
                title={item.product.name}
                price={item.product.price}
                count={item.quantity}
                setCartItems={setCartItems}
                item={item}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleDelete={handleDelete}
                actionLoading={actionLoading}
              />
            </li>
          ))}
        </ul>
        <div className="total-price mt-6 p-4 rounded-lg flex flex-col md:flex-row justify-center md:justify-between md:items-center shadow-xl">
          <h3 className="text-lg font-bold">Total Price: {totalPrice}$</h3>
          <button className="btn btn-danger my-2" disabled={actionLoading}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
