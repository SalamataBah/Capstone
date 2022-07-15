import React from "react";
import "./LinkedinLogin.css";
import axios from "axios";

export default function LinkedinLogin() {
  const requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86bj0k3tnixpok&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:3000/home`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };
  return (
    <div>
      <button className="button" onClick={() => requestProfile()}>
        {" "}
        Sign In With Linkedin{" "}
      </button>
    </div>
  );
}
