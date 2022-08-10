import React from "react";
import "./NavDeskTop.css";
import Logo from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/components/Logo/Logo.jsx";
import { Link } from "react-router-dom";

function NavDesktop({ isLoggedIn, onClickLogOut }) {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-logo">
          <Logo />
        </div>
        <div className="navbar-container">
          <Link to="/home" className="shortLinks">
            Home
          </Link>
          <Link to="/about" className="shortLinks">
            About
          </Link>
          <Link to="/faqs" className="shortLinks">
            FAQs
          </Link>
          <Link to="/successStories" className="shortLinks">
            Success Stories
          </Link>
          <Link to="/contact" className="shortLinks">
            Contact
          </Link>
        </div>
        <div className="navbar-login">
          {!isLoggedIn ? (
            <>
              <Link className="button" to="/register">
                Sign Up
              </Link>
              <Link className="button" to="/login">
                Log In
              </Link>
            </>
          ) : (
            <>
              <Link className="button" to="/profile">
                Profile
              </Link>
              <Link className="button" to="/logout" onClick={onClickLogOut}>
                Log Out
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default NavDesktop;
