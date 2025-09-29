import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user-related data if needed
    localStorage.clear(); 
    sessionStorage.clear();
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-sticky pt-3">
        <ul className="nav flex-column mt-3">
          {/* <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-house-door"></i> <span>Dashboard</span>
            </a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <i className="bi bi-person-plus"></i> <span>Beneficiary Identification</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-file-medical"></i> <span>Pre Authorization</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-file-earmark-text"></i> <span>Claims</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-bar-chart"></i> <span>Reports</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-hospital"></i> <span>Hospital Empanelment</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-people"></i> <span>User Management</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-headset"></i> <span>Helpdesk</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-bell"></i> <span>Notifications</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="bi bi-gear"></i> <span>Settings</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;