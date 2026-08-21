import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOGIN SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // ------------------------------------------
    // Email validation
    // ------------------------------------------

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // ------------------------------------------
    // Password empty validation
    // ------------------------------------------

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // ------------------------------------------
    // Password minimum length
    // ------------------------------------------

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long."
      );
      return;
    }

    try {
      const response = await api.post("/auth/login/", {
        username: email,
        password,
      });

      localStorage.setItem("access_token", response.data.tokens.access);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to connect to the backend."
      );
    }
  };

  // ==========================================
  // COMPONENT
  // ==========================================

  return (
    <div className="login-page">

      {/* =================================================
          LEFT BRAND SECTION
      ================================================= */}

      <div className="login-brand">

        <div className="brand-content">

          {/* Logo */}

          <div className="brand-logo">
            🎓
          </div>


          {/* Title */}

          <h1>
            Student Management System
          </h1>


          {/* Description */}

          <p>
            Manage students, academics, attendance,
            examinations and more from one place.
          </p>


          {/* Features */}

          <div className="brand-features">

            <div className="brand-feature">

              <span>
                ✓
              </span>

              <p>
                Student Management
              </p>

            </div>


            <div className="brand-feature">

              <span>
                ✓
              </span>

              <p>
                Attendance Tracking
              </p>

            </div>


            <div className="brand-feature">

              <span>
                ✓
              </span>

              <p>
                Examination & Marks
              </p>

            </div>


            <div className="brand-feature">

              <span>
                ✓
              </span>

              <p>
                Reports & Analytics
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          RIGHT LOGIN SECTION
      ================================================= */}

      <div className="login-container">

        <div className="login-card">

          {/* =================================================
              LOGIN HEADER
          ================================================= */}

          <div className="login-header">

            {/* Mobile Logo */}

            <div className="mobile-logo">
              🎓
            </div>


            <h2>
              Welcome Back
            </h2>


            <p>
              Login to your account
            </p>

          </div>


          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="login-form-group">

              <label htmlFor="email">
                Email Address
              </label>


              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                autoComplete="email"
              />

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="login-form-group">

              {/* Password Label */}

              <label htmlFor="password">
                Password
              </label>


              {/* Password Input */}

              <div className="password-input">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  autoComplete="current-password"
                  minLength={8}
                />


                {/* Show / Hide Password */}

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword
                    ? "🙈"
                    : "👁️"}

                </button>

              </div>


              {/* =================================================
                  FORGOT PASSWORD
                  Appears BELOW password input
              ================================================= */}

              <div className="forgot-password-wrapper">

                <Link
                  to="/forgot-password"
                  className="forgot-password"
                >
                  Forgot Password?
                </Link>

              </div>

            </div>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

              <div className="auth-error">

                {error}

              </div>

            )}


            {/* =================================================
                REMEMBER ME
            ================================================= */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="login-divider">

            <span>
              OR
            </span>

          </div>


          {/* =================================================
              CREATE ACCOUNT
          ================================================= */}

          <div className="create-account">

            <p>
              New to Student Management System?
            </p>


            <Link
              to="/register"
              className="create-account-button"
            >
              Create a New Account
            </Link>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="login-footer">

            <p>
              © 2026 Student Management System
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;