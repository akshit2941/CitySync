import React from "react";
import { Link } from "react-router-dom";
import { doSignOut } from "../firebase/auth";

function Navbar() {
  return (
    <header className="flex justify-between items-center w-full py-2 px-20">
      <div className="text-2xl font-bold text-black">SIH2024</div>
      <nav className="flex-1 flex justify-center items-center space-x-10">
        <Link
          to="/home"
          className="text-lg font-medium text-black relative hover:before:w-full before:w-0 before:h-0.5 before:bg-black before:absolute before:top-full before:left-0 before:transition-all before:duration-300"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-lg font-medium text-black relative hover:before:w-full before:w-0 before:h-0.5 before:bg-black before:absolute before:top-full before:left-0 before:transition-all before:duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/explore"
          className="text-lg font-medium text-black relative hover:before:w-full before:w-0 before:h-0.5 before:bg-black before:absolute before:top-full before:left-0 before:transition-all before:duration-300"
        >
          Projects
        </Link>
        <Link
          to="/explore"
          className="text-lg font-medium text-black relative hover:before:w-full before:w-0 before:h-0.5 before:bg-black before:absolute before:top-full before:left-0 before:transition-all before:duration-300"
        >
          Explore
        </Link>
        <Link
          to="/forum"
          className="text-lg font-medium text-black relative hover:before:w-full before:w-0 before:h-0.5 before:bg-black before:absolute before:top-full before:left-0 before:transition-all before:duration-300"
        >
          Discussion
        </Link>
      </nav>
      <div className="ml-auto">
        <button
          className="bg-blue-500 text-white font-medium text-sm py-2 px-6 rounded-lg hover:bg-gray-300 hover:text-gray-800 transition-all duration-300"
          onClick={doSignOut}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
