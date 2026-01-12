import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
  return (
      <nav className="bg-gray-500 text-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Taratia</div>
          <button
            className="md:hidden text-white dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
          <div className={`md:flex ${isOpen ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col md:flex-row gap-4">
                <span className="text-white dark:text-gray-300 hover:text-gray-200">Home</span>
                <span className="text-white dark:text-gray-300 hover:text-gray-200">Gallery</span>
                <span className="text-white dark:text-gray-300 hover:text-gray-200">Location</span>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
