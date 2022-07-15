import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  const onClick = (event) => {
    event.preventDefault();
    handleLogout();
  };
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-logo">
          <Logo />
        </div>
        <div className="navbar-container">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/successStories">Success Stories</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="navbar-login">
          <Link className="button" to="/register">
            Sign Up
          </Link>
          <Link className="button" to="/login">
            Log In
          </Link>
          {isLoggedIn && (
            <Link
              className="button"
              target="_blank"
              to="/logout"
              onClick={onClick}
            >
              Log Out
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
