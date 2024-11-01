import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Navbar setSearch={setSearch} cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Products search={search} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart items={cartItems} setCartItems={setCartItems} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
