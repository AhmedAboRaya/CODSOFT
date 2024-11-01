/* eslint-disable react/prop-types */
import axios from "axios";
import ProductCard from "../../ui/ProductCard";
import { useEffect, useState } from "react";
import ErrorPage from "../errorPage/ErrorPage"; 

const Products = ({ search, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setTimeout(() => {
          setProducts(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full flex justify-center items-center">
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 container">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.image}
              title={product.title}
              price={product.price}
              rate={product.rating.rate}
              count={product.rating.count}
              setCartItems={setCartItems}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No products found matching your search.</h2>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
