import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ErrorPage from "./components/errorPage/ErrorPage";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp ";
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";

function App() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation(); 
  
  return (
    <>
      {(location.pathname === "/login" || location.pathname === "/signup") ? null : (
        <Navbar setSearch={setSearch} cartItems={cartItems} />
      ) }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products search={search} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart items={cartItems} setCartItems={setCartItems} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
