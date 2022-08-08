import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerCont">
      <div className="footer">
        <div className="footer-copyright">
          <p className="footerPara">
            @2022 Meet and Match. All rights reserved.
          </p>

          <p className="footerPara">
            Privacy Policy{" "}
            <span style={{ marginLeft: "15px" }}> Terms & Conditions</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
