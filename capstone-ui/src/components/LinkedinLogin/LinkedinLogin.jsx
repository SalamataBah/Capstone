import React from "react";
import "./LinkedinLogin.css";
import { useState, useEffect } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import _ from "lodash";
import axios from "axios";

export default function LinkedinLogin({ isLoggedIn, setIsLoggedIn }) {
  const [state, setState] = useState({
    isAuthorized: false,
    firstName: null,
    lastName: null,
    profileURL: null,
    pictureURL: null,
  });

  // useEffect(() => {
  //   window.addEventListener("message", handlePostMessage);
  // }, []);

  // const handlePostMessage = (event) => {
  //   if (event.data.type === "profile") {
  //     updateProfile(event.data.profile);
  //     console.log("event.data.profile: ", event.data.profile);
  //     alert.success(
  //       `Login successful: ${event.data.profile.localizedFirstName}`,
  //       { position: "top" }
  //     );
  //   }
  // };

  // const updateProfile = (profile) => {
  //   setState({
  //     isAuthorized: true,
  //     firstName: _.get(profile, "localizedFirstName", ""),
  //     lastName: _.get(profile, "localizedLastName", ""),
  //     profileURL: `https://www.linkedin.com/in/${_.get(
  //       profile,
  //       "vanityName",
  //       ""
  //     )}`,
  //     pictureURL: _.get(
  //       _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
  //       "identifiers[0].identifier",
  //       ""
  //     ),
  //   });
  // };
  // const requestProfile = () => {
  //   var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86bj0k3tnixpok&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:3000/profile`;
  //   var width = 450,
  //     height = 730,
  //     left = window.screen.width / 2 - width / 2,
  //     top = window.screen.height / 2 - height / 2;

  //   window.open(
  //     oauthUrl,
  //     "Linkedin",
  //     `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
  //   );
  // };
  const getUserCredentials = (code) => {
    axios
      .get(
        `http://localhost:3000/profile?code=AQQM2aGqCUhdLF0g8CeiJsEqnYzEvafhusSmm8fGpEi3lKdRZ1lNmFDuy5ET5JfI9CqXyGjyZr_oqDfnRpcYUoxLPaUBgOApygdLujhQXLBuM5oIpb5TRJq3vrf6srZ5jnhQpPytGKamQuiH5WRAa_d7JK-GYtRVJoRx45BCNpyB0IKz-TmGa4qC8OhqWnhvQ6pOzZ_CSGyfgzDnePQ`
      )
      .then((res) => {
        console.log("user from linkedIn", res.data);
        const user = res.data;
        this.setState({
          user,
          loaded: true,
        });
        // Do something with user
      });
  };

  useEffect(() => {
    getUserCredentials();
  });

  console.log("linkedInLogin: ");
  const { linkedInLogin } = useLinkedIn({
    clientId: "86bj0k3tnixpok",
    onSuccess: (code) => {
      console.log("code", code);
    },
    redirectUri: "http://localhost:3000/profile",
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <div>
      <button
        className="button"
        onClick={linkedInLogin}
        //  onClick={() => requestProfile()}
      >
        Sign In With Linkedin
      </button>
    </div>
  );
}
