import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import rajLogo from '../../assets/raj-logo.png';
import logo from '../../assets/logo.png';

const Header = ({ toggleSidebar, sidebarCollapsed }) => {
  const navigate = useNavigate();
  const [fontScale, setFontScale] = useState(1); // 1 = 100%

  useEffect(() => {
    document.documentElement.style.setProperty('--global-font-scale', fontScale);
  }, [fontScale]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  // Each click = ±5% (0.05)
  const increaseFont = () => {
    if (fontScale < 1.1) {
      setFontScale(prev => parseFloat((prev + 0.05).toFixed(2)));
    }
  };

  const decreaseFont = () => {
    if (fontScale > 0.9) {
      setFontScale(prev => parseFloat((prev - 0.05).toFixed(2)));
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid px-0 header-container d-flex align-items-center justify-content-between">
        {/* Logos */}
        <div className="header-logos d-flex align-items-center">
          <img src={rajLogo} className="govt-logo" alt="Government Logo" />
          <img src={logo} className="logo-img ms-2" alt="Logo" />
        </div>

        {/* Title */}
        <div className="header-title-text text-center">
          <h4 className="mb-0 header-title">Mukhyamantri Ayushman Arogya Yojana</h4>
          <span className="header-subtitle">Rajasthan State Health Assurance Agency</span>
        </div>

        {/* Right side: Font size controls + Profile */}
        <div className="d-flex align-items-center gap-3">
          {/* Font size controls */}
          <div className="d-flex align-items-center gap-1 accessibility">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={decreaseFont}
              disabled={fontScale <= 0.9}
              title="Decrease font size"
            >
              A−
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={increaseFont}
              disabled={fontScale >= 1.1}
              title="Increase font size"
            >
              A+
            </button>
          </div>

          {/* User Profile Dropdown */}
          <Dropdown align="end" className='profile-drop'>
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

          {/* Toggle button - visible only on mobile */}
          <button 
            className="navbar-toggler d-lg-none me-2 border-0 text-light" 
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            style={{ fontSize: '1.5rem' }}
          >
            <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
