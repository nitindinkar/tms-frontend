import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };


  return (
    <>
    <div className="App">
      <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`} id="mainContent" >
          <Outlet />
        <Footer />
      </div>
    </div>

      
      
      
    </>
  );
};

export default Layout;
