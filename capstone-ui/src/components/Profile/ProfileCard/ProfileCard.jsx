import React from "react";
import "./ProfileCard.css";
import Loading from "../../Loading/Loading";

const ProfileCard = ({
  userInfo,
  onClickInterests,
  isLoading,
  setUserInfo,
  saveInfo,
}) => {
  const removeRole = (key) => {
    var temp = userInfo.roles;
    temp.splice(key, 1);
    setUserInfo({ ...userInfo, roles: temp });
  };
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="welcome" id="welcome">
      <div className="user-info">
        <div className="container">
          <h2> {userInfo.username} </h2>
          <br />
          <div className="information">
            <p className="basic-info">Add more info </p>
            <div className="button">
              <p onClick={onClickInterests}>Add Your Interests</p>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="basic-info">Edit basic info </p>
          <input
            className="input"
            type="text"
            placeholder="academic major"
            id="major"
          ></input>
          <br />
          <input
            className="input"
            type="text"
            placeholder="bio"
            id="bio"
          ></input>
          <br />
          <input
            className="input"
            type="text"
            placeholder="Industry"
            id="location"
          ></input>
          <br />
          <br />
          <div>
            <label className="basic-info">Add Your Role: </label>
            <select name="roles" id="roles" className="roles">
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>
          <br />
          {userInfo.roles && userInfo.roles.length != 0
            ? userInfo.roles.map((role, key) => (
                <div key={key} className="tag-item">
                  <p className="tag-text">{role}</p>
                  <p
                    className="remove-tag"
                    onClick={() => {
                      var newTags = userInfo.roles;
                      newTags.splice(key, 1);
                      setUserInfo({ ...userInfo, roles: newTags });
                    }}
                  >
                    {" "}
                    x
                  </p>
                </div>
              ))
            : null}
          <p className="button" onClick={() => saveInfo()}>
            Save
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
