// # Admin dashboard sidebar
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../pages/css/KayAdmin.css';

const KaySidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div className="kay-sidebar">
      <h3 className="kay-sidebar-title">Admin Panel</h3>
      <div className="kay-sidebar-links">
        <Link to="/admin/dashboard" className="kay-sidebar-link">
          Dashboard
        </Link>
        <Link to="/admin/pending-caregivers" className="kay-sidebar-link">
          Pending Caregivers
        </Link>
        <Link to="/admin/approved-caregivers" className="kay-sidebar-link">
          Approved Caregivers
        </Link>
        <Link to="/admin/donations" className="kay-sidebar-link">
          Donations
        </Link>
        <button onClick={handleLogout} className="kay-sidebar-logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default KaySidebar;