// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-yellow-600">BankingApp</div>
      <div className="space-x-4">
        <Link to="/accounts" className="text-gray-700 hover:text-blue-500">Accounts</Link>
        <Link to="/transactions" className="text-gray-700 hover:text-blue-500">Transactions</Link>
        <Link to="/transfer" className="text-gray-700 hover:text-blue-500">Transfer</Link>
        <Link to="/logout" className="text-red-500 hover:text-red-700">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
