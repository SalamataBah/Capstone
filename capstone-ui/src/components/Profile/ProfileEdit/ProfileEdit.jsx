import React, { useEffect } from "react";
import "./ProfileEdit.css";
import Loading from "../../Loading/Loading";
import Footer from "../../Footer/Footer";
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
  onClickFav,
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
      <div className="headCont">
        <h1>My Profile</h1>
      </div>
      <div className="edit">
        <div className="container">
          <h2> Welcome: {userInfo?.username}</h2>
          <p className="basic-info">
            Now, set up your profile and find a match!
          </p>
          <div className="button">
            <p onClick={onClickInterests}>Add Your Interests</p>
          </div>
        </div>

        <div className="container">
          <div className="info">
            <p className="basic-info">Major:</p>{" "}
            <p className="text">{userInfo?.major}</p>
            <p className="basic-info">Bio: </p>
            <p className="text">{userInfo?.bio}</p>
            <p className="basic-info">Industry: </p>
            <p className="text">{userInfo?.location}</p>
            <p className="basic-info">Role:</p>
            {userInfo?.roles
              ? userInfo.roles.map((role, key) => (
                  <div key={key} className="role-state">
                    <p className="text">{role}</p>
                  </div>
                ))
              : null}
          </div>

          <p className="button" onClick={goToEditInfo}>
            Edit Profile
          </p>
        </div>
      </div>
      <div className="container-bottom">
        <p className="button" onClick={onClickMatch}>
          Find Your Match{" "}
        </p>
        <p className="button" onClick={onClickFav}>
          Favorite Match{" "}
        </p>
        <p className="button" onClick={onClickSearch}>
          Search For a match{" "}
        </p>
        <p className="button" onClick={onClickMap}>
          Find your Match on a Map{" "}
        </p>
      </div>
      <div className="footer-profile">
        <Footer />
      </div>
    </div>
  );
}
