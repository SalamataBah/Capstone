import React from "react";
import "./ProfileCard.css";
import SearchPage from "../SearchPage/SearchPage";
import axios from "axios";
import * as config from "../../config";
import { createRef } from "react";
import { useEffect, useState } from "react";

const ProfileCard = ({ handleLogin }) => {
  const username = createRef();
  const password = createRef();

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const response = await axios.get(`${config.API_BASE_URL}/userProfile`);
    console.log("response: ", response);
    setUserProfile(response.data);
  };
  console.log("userProfile: ", userProfile.username);

  const login = async () => {
    try {
      console.log("Logging in");
      const res = await axios.post(`${config.API_BASE_URL}/login`, {
        username: username.current.value,
        password: password.current.value,
      });
      handleLogin(res.data.user);
    } catch (err) {
      alert(err);
    }
  };
  login();

  return (
    <div className="profile">
      <div className="profile-container">
        <p className="welcome-user"> Welcome{userProfile.username}</p>
        <img src={""} alt="" height="10px" width="100px" />
        <h1>
          <a href={""} target="_blank">
            {}
          </a>
        </h1>
      </div>
      <SearchPage />
    </div>
  );
};

export default ProfileCard;
