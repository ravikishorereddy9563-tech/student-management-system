import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.post("/auth/register/", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create the account."
      );
    }
  };


  return (

    <div className="login-page">

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <div className="mobile-logo">
              🎓
            </div>

            <h2>
              Create New Account
            </h2>

            <p>
              Register for the Student Management System
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="login-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* Email */}

            <div className="login-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>


            {/* Password */}

            <div className="login-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />

            </div>


            {/* Confirm Password */}

            <div className="login-form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

            </div>


            {/* Error */}

            {error && (

              <div className="auth-error">
                {error}
              </div>

            )}


            <button
              type="submit"
              className="login-button"
            >
              Create Account
            </button>

          </form>


          <div className="create-account">

            <p>
              Already have an account?
            </p>

            <Link
              to="/login"
              className="create-account-button"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};


export default Register;