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
            <NavLink to="/beneficiary-identification" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-person-vcard"></i> <span>Beneficiary Identification</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/pre-authorization" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-file-earmark-medical"></i> <span>Pre Authorization Request</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/emergency-case-conversion" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-exclamation-triangle"></i> <span>Emergency Case Conversion</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/pre-authorization-decision" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-clipboard2-check"></i> <span>Pre Authorization Decision</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/patient-admission" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-person-add"></i> <span>Patient Admission</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/preauth-decision-enhancement" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-arrow-up-circle"></i> <span>Pre Authorization Decision Enhancement</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/patient-discharge-claim" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-journal-medical"></i> <span>Patient Discharge & Claim Submission</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/claim-settlement" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-cash-stack"></i> <span>Claim Settlement</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/query-panel" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-question-circle"></i> <span>Query Panel</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/tid-edit" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-pencil-square"></i> <span>TID Edit</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/claim-analyzer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-graph-up"></i> <span>Claim Analyzer</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/feedback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <i className="bi bi-chat-square-dots"></i> <span>Feedback</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <a 
              className="nav-link btn btn-link text-start" 
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
