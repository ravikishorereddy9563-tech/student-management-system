import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Temporary frontend implementation.
    // Later this will call the Django backend.

    setMessage(
      "If an account exists with this email, a password recovery link will be sent."
    );

    setTimeout(() => {
      navigate("/reset-password");
    }, 1500);
  };

  return (
    <div className="login-page">

      {/* Brand Section */}

      <div className="login-brand">

        <div className="brand-content">

          <div className="brand-logo">
            🎓
          </div>

          <h1>
            Student Management System
          </h1>

          <p>
            Recover your account and securely
            reset your password.
          </p>

          <div className="brand-features">

            <div className="brand-feature">
              <span>✓</span>
              <p>Secure Password Recovery</p>
            </div>

            <div className="brand-feature">
              <span>✓</span>
              <p>Email Verification</p>
            </div>

            <div className="brand-feature">
              <span>✓</span>
              <p>Secure Password Reset</p>
            </div>

          </div>

        </div>

      </div>


      {/* Forgot Password Section */}

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <div className="mobile-logo">
              🔐
            </div>

            <h2>
              Forgot Password?
            </h2>

            <p>
              Enter your registered email address
              to recover your account.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="login-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

            </div>


            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            {message && (
              <div className="auth-success">
                {message}
              </div>
            )}


            <button
              type="submit"
              className="login-button"
            >
              Send Recovery Link
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

export default ForgotPassword;