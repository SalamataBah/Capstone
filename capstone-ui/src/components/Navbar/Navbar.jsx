import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import ProfileCard from "../ProfileCard/ProfileCard";

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
          <button type="button" onClick={this.requestProfile}>
            Log in
          </button>
          {this.state.isAuthorized && (
            <ProfileCard
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              profileURL={this.state.profileURL}
              pictureURL={this.state.pictureURL}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
