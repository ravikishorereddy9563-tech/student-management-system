import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const menuItems = [

    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },

    {
      name: "Students",
      path: "/admin/students",
      icon: "👨‍🎓",
    },

    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: "👨‍🏫",
    },

    {
      name: "Departments",
      path: "/admin/departments",
      icon: "🏢",
    },

    {
      name: "Courses",
      path: "/admin/courses",
      icon: "📚",
    },

    {
      name: "Subjects",
      path: "/admin/subjects",
      icon: "📖",
    },

    {
      name: "Classes",
      path: "/admin/classes",
      icon: "🏫",
    },

    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: "📅",
    },

    {
      name: "Exams",
      path: "/admin/exams",
      icon: "📝",
    },

    {
      name: "Marks",
      path: "/admin/marks",
      icon: "🎯",
    },

    {
      name: "Fees",
      path: "/admin/fees",
      icon: "💰",
    },

    {
      name: "Announcements",
      path: "/admin/announcements",
      icon: "📢",
    },

    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: "🔔",
    },

    {
      name: "Reports",
      path: "/admin/reports",
      icon: "📊",
    },

    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙️",
    },

  ];


  return (

    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <h2>
          SMS
        </h2>

        <span>
          Student Management
        </span>

      </div>


      {/* Menu */}

      <nav>

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >

            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-text">
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>

    </aside>

  );
};

export default Sidebar;