import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import barImg from "../../images/barImg.PNG";
import girlSide from "../../images/girlSide.PNG";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="tCont">
          <ol
            type="1"
            style={{
              textAlign: "center",
            }}
          >
            <button type="button" className="howWorkBtn">
              HOW IT WORKS
            </button>
            <li
              style={{
                fontSize: "28px",
              }}
            >
              <h4>ENTER YOUR INFORMATION</h4>
            </li>
            <li
              style={{
                fontSize: "28px",
              }}
            >
              <h4>FIND A MATCH</h4>
            </li>
            <li
              style={{
                fontSize: "28px",
              }}
            >
              <h4>GET DIRECTLY CONNECTED</h4>
            </li>
          </ol>
          <Link className="howWorkBtn" to="/register">
            FIND A MATCH
          </Link>

          <img
            src={barImg}
            style={{
              display: "block",
              marginTop: "35px",
              width: "350px",
              height: "50px",
            }}
          />
        </div>

        <div className="imgCont">
          <img
            src={girlSide}
            alt="meet and match"
            style={{ color: "white", height: "300px", width: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
