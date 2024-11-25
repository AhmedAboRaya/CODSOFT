/* eslint-disable react/prop-types */
import axios from "axios";
import ProductCard from "../../ui/ProductCard";
import { useEffect, useState } from "react";
import ErrorPage from "../errorPage/ErrorPage"; 
import { host } from "../../host.js.js";
import { useNavigate } from "react-router-dom"; 

const Products = ({ search, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 
  const [authError, setAuthError] = useState(false); 
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token"); 

      if (!token) {
        setAuthError(true);
        return; 
      }

      try {
        const response = await axios.get(`${host}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        localStorage.setItem('userId', response.data._id);
      } catch (error) {
        console.error("Token validation failed:", error);
        setSessionExpiredMessage('Your session has expired. Please log in again.');
        setAuthError(true); 
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${host}/products`);
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

    validateToken(); 
    fetchProducts();
  }, []);

  const updateProductStock = (productId) => {
    setProducts((prevProducts) => 
      prevProducts.map((product) => 
        product._id === productId ? { ...product, stock: product.stock - 1 } : product
      )
    );
  };

  if (authError) {
    setTimeout(() => {
      navigate("/login");
    }, 4000); 
    
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{sessionExpiredMessage}</h2>
          <p className="text-gray-600">You will be redirected to the login page shortly.</p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
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
              key={product._id}
              id={product._id}
              imageUrl={product.images[0]}
              title={product.name}
              price={product.price}
              rate={product.ratings.average}
              count={product.ratings.count}
              setCartItems={setCartItems}
              stock={product.stock}
              updateStock={updateProductStock}
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
