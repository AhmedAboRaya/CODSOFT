/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ThemeToggle from "../../ui/ThemeToggle";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

const Navbar = ({ setSearch, cartItems = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSecondNavbar, setShowSecondNavbar] = useState(false);
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setShowSecondNavbar(true);
      } else if (currentScrollY < lastScrollY && currentScrollY < 200) {
        setShowSecondNavbar(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* First Navbar */}
      <div
        className={`navbar hidden sm:flex bg-base-200 transition-transform duration-300 ease-in-out top-0 left-0 right-0 z-50 ${
          showSecondNavbar ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Products
          </Link>
        </div>
        {location.pathname === "/" && (
          <form className="flex-none mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input input-bordered"
            />
          </form>
        )}
        <div className="flex-none">
          <ThemeToggle />
          <Link to="/cart">
            <div className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`navbar flex sm:hidden bg-base-200 transition-transform duration-300 ease-in-out top-0 left-0 z-50 ${
          showSecondNavbar ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Products
          </Link>
        </div>
        <div
          className="flex-none mr-1 z-60 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-10" /> : <Menu className="size-10" />}
        </div>
      </div>

      {/* Sliding Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-base-200 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full items-center">
          <div className="flex items-center  p-4">
            <div
              className="cursor-pointer absolute top-2 right-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="size-10" />
              ) : (
                <Menu className="size-10" />
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-8">
            {location.pathname === "/" && (
              <form className="flex-none mx-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="input input-bordered"
                />
              </form>
            )}
            <ThemeToggle />
            <Link to="/cart" className="flex justify-center">
              <div className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cartItems.length}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Second Navbar */}
      <div
        className={`navbar hidden sm:flex bg-base-200 transition-opacity duration-300 ease-in-out fixed top-0 left-0 right-0 z-40 ${
          showSecondNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Products
          </Link>
        </div>
        {location.pathname === "/" && (
          <form className="flex-none mx-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input input-bordered"
            />
          </form>
        )}
        <div className="flex-none">
          <ThemeToggle />
          <Link to="/cart">
            <div className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={`navbar flex sm:hidden bg-base-200 transition-opacity duration-300 ease-in-out fixed top-0 left-0 right-0 z-40 ${
          showSecondNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Products
          </Link>
        </div>
        <div
          className="flex-none mr-1 z-60 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-10" /> : <Menu className="size-10" />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
