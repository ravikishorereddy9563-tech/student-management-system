import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar.jsx";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Area */}

      <main className="main-content">

        {/* Topbar */}

        <header className="topbar">

          <div>
            <h3>
              Student Management System
            </h3>
          </div>


          <div className="admin-profile">

            <span>
              👤
            </span>

            <span>
              Administrator
            </span>

          </div>

        </header>


        {/* Page Content */}

        <section className="content">

          <Outlet />

        </section>

      </main>

    </div>
  );
};

export default AdminLayout;