import toast, { Toaster } from "react-hot-toast";

/* eslint-disable react/prop-types */
const ProductCard = ({
  id,
  imageUrl,
  title,
  price,
  rate,
  count,
  setCartItems,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <input
          key={i}
          type="radio"
          name="rating-1"
          className="mask mask-star bg-yellow-500"
          checked={i <= Math.round(rate)}
          readOnly
          disabled
        />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevItems, { id: id,title: title, price: price, imageUrl: imageUrl, count: 1 }];
      }
    });
    toast.success("Added Successfully");
  };

  return (
    <>
      <div className="card duration-700 rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl card-compact bg-base-100  shadow-xl">
        <figure className="overflow-hidden flex justify-center items-center h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover duration-700"
          />
        </figure>
        <div className="card-body p-4 flex flex-col">
          <h2 className="card-title text-lg font-bold">{title}</h2>
          <p className="text-xl font-semibold ">{price}$</p>
          <div className="rating flex items-center mt-2">
            {renderStars()} &nbsp;{" "}
            <span className="text-gray-600">({count})</span>
          </div>
          <div className="card-actions justify-end mt-auto">
            <button className="btn btn-primary" onClick={handleAddToCart}>
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
