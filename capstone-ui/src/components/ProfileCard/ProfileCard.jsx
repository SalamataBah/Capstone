import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({
  firstName,
  lastName,
  profileURL,
  pictureURL,
  headline,
}) => {
  return (
    <div className="profile">
      <div className="profile-container">
        <img src={pictureURL} alt="" height="200px" width="200px" />
        <h1>
          <a href={profileURL} target="_blank">
            {firstName} {lastName}
          </a>
        </h1>
        <h2>{headline}</h2>
      </div>
    </div>
  );
};

export default ProfileCard;
