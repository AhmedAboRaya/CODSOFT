/* eslint-disable react/prop-types */
const CartCard = ({ id, imageUrl, title, price, count, setCartItems }) => {
  const handleDelete = () => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleIncrease = () => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrease = () => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            if (item.count > 1) {
              return { ...item, count: item.count - 1 };
            } else {
              handleDelete();
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  return (
    <div className="card duration-700 h-full rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl bg-base-100 shadow-xl">
      <figure>
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-48 w-full duration-700"
        />
      </figure>
      <div className="card-body p-4 flex flex-col">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="text-xl font-semibold">{price}$</p>
        <div className="flex">
          <p className="text-xl w-1/2">Quantity: </p>
          <div className="w-full mx-3 flex justify-between items-center mt-auto bg-base-300 px-1 rounded-2xl h-full">
            <button className="rounded-full w-5 h-5 bg-base-content text-white flex items-center justify-center text-lg font-bold hover:bg-slate-600 duration-300" onClick={handleDecrease}>
              <div className="mb-1">-</div>
            </button>
            <span>{count}</span>
            <button className="rounded-full w-5 h-5 bg-base-content text-white flex items-center justify-center text-lg font-bold hover:bg-slate-600 duration-300" onClick={handleIncrease}>
            <div className="mb-1">+</div>
            </button>
          </div>
        </div>{" "}
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartCard;
