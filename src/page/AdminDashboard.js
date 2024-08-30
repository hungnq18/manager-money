import React from 'react';
import Header from '../component/Header';
import MainAdmin from '../component/MainAdmin';
import Sidebar from '../component/SideBarAdmin';
import '../css/adminDashboard.css';
function AdminDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <div className="dashboard-main">
          <MainAdmin />
        </div>
        <div className="dashboard-footer">
          <p>&copy; 2023. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

