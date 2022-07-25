import React from "react";
import "./ProfileCard.css";
import SearchPage from "../SearchPage/SearchPage";
import axios from "axios";
import * as config from "../../config";
import { createRef } from "react";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

const ProfileCard = ({
  userInfo,
  onClickInterests,
  isLoading,
  goToEditInfo,
}) => {
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="welcome" id="welcome">
      <h2> welcome: {userInfo.username} </h2>
      <p className="edit-info">Set up Your profile</p>
      <p className="interests" onClick={onClickInterests}>
        Interests
      </p>
      <p className="role">
        <strong>Role: </strong> {userInfo.role}
      </p>
      <button className="button" onClick={goToEditInfo}>
        Edit
      </button>
    </div>
  );
};

export default ProfileCard;
