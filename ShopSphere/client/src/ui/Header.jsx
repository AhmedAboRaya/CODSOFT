/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import axios from "axios";
import { host } from "../host.js";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavItems = () => (
    <>
      <li>
        <Link to="/" className="text-gray-600 hover:text-gray-900 duration-300">
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/shop"
          className="text-gray-600 hover:text-gray-900 duration-300"
        >
          Shop
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="text-gray-600 hover:text-gray-900 duration-300"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="text-gray-600 hover:text-gray-900 duration-300"
        >
          Contact
        </Link>
      </li>

      {auth ? (
        <>
          {" "}
          <li>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-900 md:hidden duration-300"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-900 md:hidden duration-300"
            >
              Cart
            </Link>
          </li>{" "}
        </>
      ) : (
        <div>
          {" "}
          <li>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 md:hidden duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-gray-900 md:hidden duration-300"
            >
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </>
  );

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
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          LOGO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <NavItems />
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-full w-full size-52 text-2xl" />
              <span className="sr-only  size-52">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="mt-6">
              <ul className="space-y-4">
                <NavItems />
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        {auth ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/account"
              className="text-gray-600 hover:text-gray-900 duration-300"
            >
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Link>
            <Link
              to="/cart"
              className="text-gray-600 hover:text-gray-900 duration-300"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 ml-4 duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-black px-3 py-2 ml-3 rounded-md text-gray-100 border-2 hover:text-black hover:bg-white hover:shadow-lg duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
