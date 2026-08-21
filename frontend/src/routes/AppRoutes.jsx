import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* =====================================================
   AUTHENTICATION
===================================================== */

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";


/* =====================================================
   ADMIN LAYOUT
===================================================== */

import AdminLayout from "../layouts/AdminLayout.jsx";


/* =====================================================
   ADMIN PAGES
===================================================== */

import Dashboard from "../pages/admin/Dashboard.jsx";
import Students from "../pages/admin/Students.jsx";
import AddStudent from "../pages/admin/AddStudent.jsx";
import StudentDetails from "../pages/admin/StudentDetails.jsx";

import Teachers from "../pages/admin/Teachers.jsx";
import Departments from "../pages/admin/Departments.jsx";
import Courses from "../pages/admin/Courses.jsx";
import Subjects from "../pages/admin/Subjects.jsx";
import Classes from "../pages/admin/Classes.jsx";

import Attendance from "../pages/admin/Attendance.jsx";
import Exams from "../pages/admin/Exams.jsx";
import Marks from "../pages/admin/Marks.jsx";
import Fees from "../pages/admin/Fees.jsx";

import Announcements from "../pages/admin/Announcements.jsx";
import Notifications from "../pages/admin/Notifications.jsx";

import Reports from "../pages/admin/Reports.jsx";
import Settings from "../pages/admin/Settings.jsx";


const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>


        {/* =================================================
            AUTHENTICATION ROUTES
        ================================================= */}

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* Create New Account */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Forgot Password */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* Reset Password */}

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =================================================
            ADMIN PANEL
        ================================================= */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* /admin → /admin/dashboard */}

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />


          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="dashboard"
            element={<Dashboard />}
          />


          {/* =================================================
              STUDENTS
          ================================================= */}

          <Route
            path="students"
            element={<Students />}
          />

          <Route
            path="students/add"
            element={<AddStudent />}
          />

          <Route
            path="students/:id/edit"
            element={<AddStudent />}
          />

          <Route
            path="students/:id"
            element={<StudentDetails />}
          />


          {/* =================================================
              TEACHERS
          ================================================= */}

          <Route
            path="teachers"
            element={<Teachers />}
          />


          {/* =================================================
              DEPARTMENTS
          ================================================= */}

          <Route
            path="departments"
            element={<Departments />}
          />


          {/* =================================================
              COURSES
          ================================================= */}

          <Route
            path="courses"
            element={<Courses />}
          />


          {/* =================================================
              SUBJECTS
          ================================================= */}

          <Route
            path="subjects"
            element={<Subjects />}
          />


          {/* =================================================
              CLASSES
          ================================================= */}

          <Route
            path="classes"
            element={<Classes />}
          />


          {/* =================================================
              ATTENDANCE
          ================================================= */}

          <Route
            path="attendance"
            element={<Attendance />}
          />


          {/* =================================================
              EXAMS
          ================================================= */}

          <Route
            path="exams"
            element={<Exams />}
          />


          {/* =================================================
              MARKS
          ================================================= */}

          <Route
            path="marks"
            element={<Marks />}
          />


          {/* =================================================
              FEES
          ================================================= */}

          <Route
            path="fees"
            element={<Fees />}
          />


          {/* =================================================
              ANNOUNCEMENTS
          ================================================= */}

          <Route
            path="announcements"
            element={<Announcements />}
          />


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <Route
            path="notifications"
            element={<Notifications />}
          />


          {/* =================================================
              REPORTS
          ================================================= */}

          <Route
            path="reports"
            element={<Reports />}
          />


          {/* =================================================
              SETTINGS
          ================================================= */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>


        {/* =================================================
            SHORTCUT ROUTES
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />


        <Route
          path="/admin-panel"
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />


        {/* =================================================
            ROOT
        ================================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* =================================================
            404 PAGE
        ================================================= */}

        <Route
          path="*"
          element={

            <div className="not-found-page">

              <div className="not-found-content">

                <div className="not-found-number">
                  404
                </div>

                <h1>
                  Page Not Found
                </h1>

                <p>
                  Sorry, the page you are looking for
                  does not exist.
                </p>

                <a
                  href="/login"
                  className="btn btn-primary"
                >
                  ← Back to Login
                </a>

              </div>

            </div>

          }
        />

      </Routes>

    </BrowserRouter>
  );
};


export default AppRoutes;