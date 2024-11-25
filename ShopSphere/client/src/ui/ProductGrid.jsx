import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Star } from "lucide-react";
import ErrorPage from "../components/errorPage/ErrorPage";
import axios from "axios";
import { host } from "../host";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

export default function ProductGrid() {
  const [productss, setProductss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState("");
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
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem("userId", response.data._id);
      } catch (error) {
        console.error("Token validation failed:", error);
        setSessionExpiredMessage(
          "Your session has expired. Please log in again."
        );
        setAuthError(true);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${host}/products`);
        setProductss(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setError(true);
      }
    };

    validateToken();
    fetchProducts();
    console.log(productss);
  }, []);

  const updateProductStock = (productId) => {
    setProductss((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, stock: product.stock - 1 }
          : product
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
          <p className="text-gray-600">
            You will be redirected to the login page shortly.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (id) => {
    const quantity = 1;
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Please log in again.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(`${host}/cart/add`, {
        userId,
        productId: id,
        quantity,
      });

      toast.success("Added Successfully");
    //   updateProductStock(id);
    } catch (error) {
      console.error("Error adding item to cart:", error.response.data);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productss.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <Link to={`/shop/${product._id}`}>
                <CardContent className="p-0 relative">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="flex flex-col items-start p-4">
                <Link to={`/shop/${product._id}`}>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.ratings.average)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.ratings.average} ({product.ratings.count})
                  </span>
                </div>
                <p
                  className={`text-sm text-left mb-2 ${
                    product.stock ? "" : "text-red-600"
                  } `}
                >
                  {product.stock ? `stock : ${product.stock}` : "out of stock"}
                </p>
                {/* <div className="flex flex-wrap gap-1 mb-4">
                {product.colors.map((color) => (
                  <span key={color} className="inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
                    {color}
                  </span>
                ))}
              </div> */}
                <Button
                  className={`w-full`}
                  onClick={() => handleAddToCart(product._id)}
                  disabled={!product.stock}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                marginTop: "60px", 
              },
            }}
          />
        </div>
      )}
    </>
  );
}
