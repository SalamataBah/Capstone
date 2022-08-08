import * as React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import logo from "../../images/logo.png";

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/home">
        <img
          src={logo}
          alt="meet and match"
          style={{ color: "white", height: "60px", width: "60px" }}
        />
      </Link>
    </div>
  );
}
