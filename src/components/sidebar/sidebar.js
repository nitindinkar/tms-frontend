import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      {/* Sidebar Header with toggle button */}
      <div className="d-flex justify-content-end align-items-center px-2 pt-3 pb-2">
        <button 
          id="sidebarToggle" 
          className="btn btn-sm btn-dark"
          onClick={toggleSidebar}
        >
          <i className={`bi ${collapsed ? 'bi-layout-sidebar' : 'bi-list'}`}></i>
        </button>
      </div>

      <div className="sidebar-sticky">
        <ul className="nav flex-column">
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
