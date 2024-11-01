/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartCard from "../../ui/CartCard";

const Cart = ({ items, setCartItems }) => {
  const [loading, setLoading] = useState(true);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link to="/">
            <button className="btn mt-3 btn-primary">Shopping Now</button>
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Cart;
