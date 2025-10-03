import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
            <NavLink 
              to="/beneficiary-identification" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-person-plus"></i> <span>Beneficiary Identification</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/pre-authorization" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-file-medical"></i> <span>Pre Authorization</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/claims" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-file-earmark-text"></i> <span>Claims</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/reports" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-bar-chart"></i> <span>Reports</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/hospital-empanelment" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-hospital"></i> <span>Hospital Empanelment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/user-management" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-people"></i> <span>User Management</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/helpdesk" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-headset"></i> <span>Helpdesk</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/notifications" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-bell"></i> <span>Notifications</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <i className="bi bi-gear"></i> <span>Settings</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link btn btn-link text-start" 
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
