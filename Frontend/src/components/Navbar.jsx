import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBriefcase, FaUserCog } from "react-icons/fa"; // Import icons
import { FaBlackTie } from "react-icons/fa";
import { TbTie } from "react-icons/tb";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-bold text-xl flex flex-row justify-center items-center gap-x-1">
          <TbTie />
          JobEase
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`md:flex ${isMobileMenuOpen ? 'block' : 'hidden'} absolute md:static bg-blue-600 w-full md:w-auto top-14 left-0 z-50`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <li>
              <Link to="/" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                <FaHome className="mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link to="/ats" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                <FaUserCog className="mr-1" /> ATS
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="flex items-center text-white hover:text-gray-200 transition duration-300">
                <FaBriefcase className="mr-1" /> Jobs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
