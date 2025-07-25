import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-lg">🏋️ MyFitnessApp</div>
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:text-green-400">Dashboard</Link>
        <Link to="/history" className="hover:text-green-400">History</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
