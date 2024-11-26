import { Routes, Route } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/navbar/Navbar";
// import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ErrorPage from "./components/errorPage/ErrorPage";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp.jsx";
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Shop from "./components/shop/Shop";
import Header from "./ui/Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { host } from './host.js';

function App() {
  // const [search, setSearch] = useState("");
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${host}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem("userId", response.data._id);
        setAuth(true);
      } catch (error) {
        setAuth(false);
      }
    };
    validateToken();
  },[]);
  return (
    <>
      {(location.pathname === "/login" || location.pathname === "/signup") ? null : (
        <Header auth={auth}/>
      ) }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/products" element={<Products search={search} setCartItems={setCartItems} />} /> */}
        <Route path="/cart" element={<Cart  />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
