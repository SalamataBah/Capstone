import React from "react";
import Navbar from "../Navbar/Navbar";
import "./About.css";
import logo from "../../images/logo.png";
import mission from "../../images/mission.PNG";

function About() {
  return (
    <div className="about-us">
      <h1 className="mainHeading">About Us</h1>
      <div className="threeDiv">
        <div className="cont1">
          <div className="imgDiv">
            <img
              src={mission}
              alt="meet and match"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="tCont">
            <h4>Mission </h4>
            <p>
              {" "}
              Connect people around the world through their academic and
              professional interests{" "}
            </p>
          </div>
        </div>

        <div className="cont1">
          <div className="imgDiv">
            <img
              src={logo}
              alt="meet and match"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="tCont">
            <h4>Values </h4>
            <p>
              {" "}
              Connect people around the world through their academic and
              professional interests{" "}
            </p>
          </div>
        </div>

        <div className="cont1">
          <div className="imgDiv">
            <img
              src={mission}
              alt="meet and match"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div className="tCont">
            <h4>IMPACT </h4>
            <p>
              {" "}
              Connect people around the world through their academic and
              professional interests{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
