import React from "react";
import "./ProfileEdit.css";
import Loading from "../../Loading/Loading";

export default function ProfileEdit({
  userInfo,
  onClickInterests,
  goToEditInfo,
  isLoading,
}) {
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="profileEdit" id="profileEdit">
      <div className="edit">
        <div className="container">
          <img></img>
          <h2> Welcome: {userInfo.username}</h2>
          <p className="edit-info">
            Now, set up your profile and find a match!
          </p>
          <div className="info">
            <p onClick={onClickInterests}>Interests</p>
          </div>
        </div>

        <div className="container">
          <div className="info">
            <p>Major: {userInfo.major}</p>
            <p>Bio: {userInfo.bio}</p>
            <p>Location: {userInfo.location}</p>
            <p>Role:</p>
            {userInfo?.roles
              ? userInfo.roles.map((role, key) => (
                  <div key={key} className="role-state">
                    <p className="role-input">{role}</p>
                  </div>
                ))
              : null}
          </div>

          <button className="button" onClick={goToEditInfo}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
