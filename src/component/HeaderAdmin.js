import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import '../css/adminDashboard.css';

function HeaderAdmin() {
  return (
    <div className="header">
      <h1>Admin Dashboard</h1>
      <button className="logout-btn">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default HeaderAdmin;
