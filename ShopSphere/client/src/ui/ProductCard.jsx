import toast, { Toaster } from "react-hot-toast";
import axios from "axios"; 
// import { host } from "../host.js"; 

/* eslint-disable react/prop-types */
const ProductCard = ({
  id,
  imageUrl,
  title,
  price,
  rate,
  count,
  setCartItems,
  stock,
  updateStock,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name={`rating-${id}`} 
          className="mask mask-star bg-yellow-500"
          checked={i <= Math.round(rate)}
          readOnly
          disabled
        />
      );
    }
    return stars;
  };

  const handleAddToCart = async () => {
    const quantity = 1; 
    const userId = localStorage.getItem("userId"); 

    if (!userId) {
      toast.error("User ID not found. Please log in again."); 
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/cart/add`, {
        userId, 
        productId: id, 
        quantity, 
      });

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === id);

        if (existingItem) {
          return prevItems.map((item) =>
            item.id === id ? { ...item, count: item.count + 1 } : item
          );
        } else {
          return [...prevItems, { id, title, price, imageUrl, count: 1 }];
        }
      });
      updateStock(id);
      toast.success("Added Successfully"); 
      
    } catch (error) {
      console.error("Error adding item to cart:", error.response.data);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <>
      <div className="card duration-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl card-compact bg-base-100 shadow-xl">
        <figure className="overflow-hidden flex justify-center items-center h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover duration-700"
          />
        </figure>
        <div className="card-body p-4 flex flex-col ">
          <h2 className="card-title text-lg font-bold">{title}</h2>
          <p className="text-xl text-left font-semibold">{price}$</p>
          <p className="text-md text-left">{stock ? `stock : ${stock}` : "out of stock"}</p>
          <div className="rating flex items-center mt-2">
            {renderStars()} &nbsp;
            <span className="text-gray-600 mt-1">({count})</span>
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-primary" onClick={handleAddToCart}
             disabled={!stock}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ProductCard;
