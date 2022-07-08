import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";

const Navbar = () => {
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
          <button type="button"> Sign up </button>
          <button
            type="button"
            onClick="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86dtifyah43uj5&redirect_uri=https%3A%2F%2Fwww.google.com%2F&state=salamata&scope=r_liteprofile"
          >
            {" "}
            Log in{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
