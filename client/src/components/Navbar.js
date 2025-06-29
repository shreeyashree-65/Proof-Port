import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">Proof-Port</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/register" className="p-2 hover:text-blue-500">Register Supplier</Link>
      </div>
    </nav>
  );
};

export default Navbar;
