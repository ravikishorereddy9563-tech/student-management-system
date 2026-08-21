import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    // Temporary frontend implementation.
    // Later this will connect to Django backend.

    alert("Password reset successfully!");

    navigate("/login");
  };


  return (

    <div className="login-page">

      {/* Brand Section */}

      <div className="login-brand">

        <div className="brand-content">

          <div className="brand-logo">
            🔐
          </div>

          <h1>
            Student Management System
          </h1>

          <p>
            Create a new secure password for
            your account.
          </p>

          <div className="brand-features">

            <div className="brand-feature">
              <span>✓</span>
              <p>Minimum 8 Characters</p>
            </div>

            <div className="brand-feature">
              <span>✓</span>
              <p>Secure Password</p>
            </div>

            <div className="brand-feature">
              <span>✓</span>
              <p>Confirm Your Password</p>
            </div>

          </div>

        </div>

      </div>


      {/* Reset Password */}

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <div className="mobile-logo">
              🔐
            </div>

            <h2>
              Reset Password
            </h2>

            <p>
              Enter your new password below.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* New Password */}

            <div className="login-form-group">

              <label htmlFor="password">
                New Password
              </label>

              <div className="password-input">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* Confirm Password */}

            <div className="login-form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="password-input">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>


            {/* Password Requirements */}

            <div className="password-requirements">

              <p>Password requirements:</p>

              <ul>
                <li>At least 8 characters</li>
                <li>Use uppercase and lowercase letters</li>
                <li>Include a number</li>
                <li>Use a special character</li>
              </ul>

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="login-button"
            >
              Reset Password
            </button>

          </form>


          <div className="create-account">

            <p>
              Remember your password?
            </p>

            <Link
              to="/login"
              className="create-account-button"
            >
              ← Back to Login
            </Link>

          </div>


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

export default ResetPassword;