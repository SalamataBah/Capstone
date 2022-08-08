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
          upload image here(placeholder)
          <br />
          <img src={""} alt="" className="user-image"></img>
          <div className="information">
            <p className="info active">Add more info</p>
            <p className="info " onClick={onClickInterests}>
              Interests
            </p>
          </div>
        </div>
        <div className="container">
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
            placeholder="location"
            id="location"
          ></input>
          <br />
          <br />
          <div>
            <label className="user-role">Add Your Role: </label>
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
          <button className="button" onClick={() => saveInfo()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
