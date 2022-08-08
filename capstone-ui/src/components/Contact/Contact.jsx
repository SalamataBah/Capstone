import React from "react";
import "./Contact.css";
import { CgTwitter, CgFacebook, CgInstagram } from "react-icons/cg";

function Contact() {
  return (
    <>
      <div className="about-us">
        <h1 className="mainHeading">Contact Us</h1>
        <div className="threeDiv">
          <div className="cont">
            <h4>COMPANY </h4>
            <p>
              {" "}
              About Us <br /> Success Stories{" "}
            </p>
          </div>

          <div className="cont">
            <h4>COMPANY </h4>
            <p>
              {" "}
              Give us feedback <br /> FAqs{" "}
            </p>
          </div>

          <div className="cont">
            <h4>SOCIAL MEDIA </h4>
            <p>
              <CgTwitter id="hide_eye2" className="socialIcons" />
              <CgFacebook id="hide_eye2" className="socialIcons" />
              <CgInstagram id="hide_eye2" className="socialIcons" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
