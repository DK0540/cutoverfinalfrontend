import React, { useState } from "react";
import { useUser } from "./UserContext";
import "../Styles/LoginPage.css";
import loginImage from "../images/Login-bro.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = async (userData) => {
    window.alert("Login successful!");
    console.log(userData);

    const userEmail = formData.email;
    setUserData(userData);
    navigate(`/welcome?userEmail=${userEmail}`);
  };

  const handleLoginFailure = () => {
    window.alert("Login failed. Please check your email and password.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://amused-khakis-fly.cyclic.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        handleLoginSuccess(userData);
      } else {
        handleLoginFailure();
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h2 className="login-title">Welcome</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="button-container">
              <button type="submit" className="login-button1">
                Sign In
              </button>
            </div>
          </form>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

//========================================================================>>>
