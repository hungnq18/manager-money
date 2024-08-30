import React from 'react';
import { FaChartBar, FaClipboardList, FaMoneyCheck, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css/adminDashboard.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/users">
            <FaUser /> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/transactions">
            <FaMoneyCheck /> Transactions
          </Link>
        </li>
        <li>
          <Link to="/admin/categories">
            <FaClipboardList /> Categories
          </Link>
        </li>
        <li>
          <Link to="/admin/reports">
            <FaChartBar /> Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
