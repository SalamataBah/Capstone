import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";

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
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#about">About</a>
          </p>
          <p>
            <a href="#faqs">FAQs</a>
          </p>
          <p>
            <a href="#successStories">Success Stories</a>
          </p>
          <p>
            <a href="#contact">Contact</a>
          </p>
        </div>
        <div className="navbar-login">
          <button type="button" onClick={""}>
            Sign up
          </button>
          <button type="button" onClick={""}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
