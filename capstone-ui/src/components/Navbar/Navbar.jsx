import React from "react";
import "./Navbar.css";
import Logo from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/components/Logo/Logo.jsx";
import { Link } from "react-router-dom";
import NavDesktop from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/components/Navbar/NavDesktop/NavDesktop.jsx";
import NavMob from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/components/Navbar/NavMobile/NavMobile.jsx";

function Navbar({ isLoggedIn, onClickLogOut }) {
  return (
    <div>
      <div className="d-lg-block d-none">
        <NavDesktop isLoggedIn={isLoggedIn} onClickLogOut={onClickLogOut} />
      </div>
      <div className="d-lg-none">
        <NavMob isLoggedIn={isLoggedIn} onClickLogOut={onClickLogOut} />
      </div>
    </div>
  );
}

export default Navbar;
