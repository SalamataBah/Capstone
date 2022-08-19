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
          <h2>{userInfo.username}'s interests</h2>
          <div className="user-info">
            <p className="button" onClick={onClickProfile}>
              Go back to profile
            </p>
          </div>
        </div>
        <div className="container second">
          <p className="interests-name">Skills:{}</p>
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
          <p className="button" onClick={onEditInterests}>
            Edit
          </p>
        </div>
      </div>
    </div>
  );
}
