import React from "react";
import "./ProfileCard.css";
import SearchPage from "../SearchPage/SearchPage";
import axios from "axios";
import * as config from "../../config";
import { createRef } from "react";

const ProfileCard = ({ handleLogin }) => {
  const username = React.createRef();
  const password = React.createRef();

  const login = async () => {
    try {
      console.log("Logging in");
      const res = await axios.post(`${config.API_BASE_URL}/login`, {
        username: username.current.value,
        password: password.current.value,
      });
      console.log("username: ", username.current.value);
      handleLogin(res.data.user);
    } catch (err) {
      alert(err);
    }
  };
  login();

  return (
    <div className="profile">
      <div className="profile-container">
        <p className="welcome-user"> Welcome </p>
        <img src={""} alt="" height="10px" width="100px" />
        <h1>
          <a href={""} target="_blank">
            {} {}
          </a>
        </h1>
        <h2>{}</h2>
      </div>
      <SearchPage />
    </div>
  );
};

export default ProfileCard;
