import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./googleLogin.css";
import { gapi } from "gapi-script";

export default function GoogleLoginComp() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "827396571951-n60cbma0rpv66p3oj58kp5h4inql320a.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const onLogoutSuccess = () => {
    console.log("SUCESS LOG OUT");
  };

  return (
    <div>
      <GoogleLogin
        clientId="827396571951-n60cbma0rpv66p3oj58kp5h4inql320a.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <GoogleLogout
        clientId="827396571951-n60cbma0rpv66p3oj58kp5h4inql320a.apps.googleusercontent.com"
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}
