import React from "react";
import Loading from "../../Loading/Loading";
import "./Interests.css";

export default function Interests({
  userInfo,
  isLoading,
  onClickProfile,
  onEditInterests,
}) {
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="interests" id="interests">
      <div className="user-interests">
        <div className="container">
          <img></img>
          <h2>{userInfo.username}</h2>
          <div className="user-info">
            <p className="user-profile" onClick={onClickProfile}>
              Your Profile
            </p>
            <p className="user-profile active">Interests</p>
          </div>
        </div>
        <div className="container">
          <p className="interests-names">Skills:{}</p>
          {userInfo?.interests?.skills &&
          Array.isArray(userInfo.interests.skills)
            ? userInfo.interests.skills.map((skill, key) => (
                <div key={key} className="skills">
                  <p className="skills-name">{skill.name}</p>
                </div>
              ))
            : null}
          <br />
          <p className="interests-name"> Companies:</p>
          {userInfo?.interests?.companies &&
          Array.isArray(userInfo.interests.companies)
            ? userInfo.interests.companies.map((company, key) => (
                <div key={key} className="skills">
                  <p className="skills-name">{company.name}</p>
                </div>
              ))
            : null}
          <p className="interests-name"> Languages:</p>
          {userInfo?.interests?.languages &&
          Array.isArray(userInfo.interests.languages)
            ? userInfo.interests.languages.map((language, key) => (
                <div key={key} className="skills">
                  <p className="skills-name">{language.name}</p>
                </div>
              ))
            : null}
          <button className="button" onClick={onEditInterests}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
