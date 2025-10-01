import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import rajLogo from '../../assets/raj-logo.png';
import logo from '../../assets/logo.png';

const Header = ({ toggleSidebar, sidebarCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user-related data if needed
    localStorage.clear(); 
    sessionStorage.clear();
    // Navigate to login page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid px-0">
        <div className="header-logos">
          <img
            src={rajLogo}
            className="govt-logo"
            alt="Government Logo"
          />
          <img 
            src={logo}
            className="logo-img" 
            alt="Logo" 
          />

        </div>
        <div className="header-title-text">
          <h4 className="mb-0 header-title">Mukhyamantri Ayushman Arogya Yojana</h4>
          <span className="header-subtitle">Rajasthan State Health Authority</span>
        </div>
        
        {/* User Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle className="d-flex align-items-center text-white bg-transparent border-0 shadow-none">
            <div className="avatar me-2 fs-4"><i className="bi bi-person-fill"></i></div>
            <div className="text-start">
              <h6 className="mb-0">Mahatma Gandhi Hospital Jaipur</h6>
              <small><i>Username</i></small>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className='py-0'>
            <Dropdown.Item href="#"><i className="bi bi-house-door me-2"></i> Home</Dropdown.Item>
            <Dropdown.Item href="#"><i className="bi bi-key me-2"></i> Change Password</Dropdown.Item>
            <Dropdown.Item href="#"><i className="bi bi-arrow-left-right me-2"></i> Back to SSO</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Header;
