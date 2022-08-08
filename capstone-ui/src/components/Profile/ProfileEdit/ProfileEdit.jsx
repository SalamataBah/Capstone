import React, { useEffect } from "react";
import "./ProfileEdit.css";
import Loading from "../../Loading/Loading";
import SearchPage from "../../SearchPage/SearchPage";
import { useMapContext } from "../../../contexts/MapContext.jsx";
import axios from "axios";
import * as config from "../../../config";

export default function ProfileEdit({
  userInfo,
  onClickInterests,
  goToEditInfo,
  isLoading,
  onClickMatch,
  onClickSearch,
  onClickMap,
}) {
  const { lat, lng } = useMapContext();

  useEffect(() => {
    const getUserCoords = async () => {
      console.log("In profile edit");
      await axios.post(`${config.API_BASE_URL}/userCoords`, {
        lat: lat,
        lng: lng,
      });
    };

    getUserCoords();
  }, [lat, lng]);

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
            Edit Profile
          </button>
        </div>
      </div>
      <button className="button" onClick={onClickMatch}>
        Find Your Match{" "}
      </button>
      <button className="button" onClick={onClickSearch}>
        Search For a match{" "}
      </button>
      <button className="button" onClick={onClickMap}>
        Find a Match on a Map{" "}
      </button>
    </div>
  );
}
