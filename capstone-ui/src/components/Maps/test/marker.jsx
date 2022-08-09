import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMapContext } from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/contexts/MapContext.jsx";
import axios from "axios";
import * as config from "../../../config";

export default function Maps(userInfo) {
  const [allUserCoords, setAllUserCoords] = useState([]);
  const [allUsersLocation, setAllUsersLocation] = useState([]);

  const onLoadMarker = () => {};
  const [position, setPosition] = useState({
    lat: 37.3859233,
    lng: -121.996504,
  });
  const { lat, lng } = useMapContext();
  console.log("lng: ", lng);
  console.log("lat: ", lat);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxEDEgIYJMJK4XnwR1h7-zbdU9d2yZ3WY",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    const updateCoords = () => {
      setPosition({ lat: lat, lng: lng });
    };
    updateCoords();
  }, [lat, lng]);

  useEffect(() => {
    const getUsersCoords = () => {
      axios.get(`${config.API_BASE_URL}/allUsersCoords`).then((result) => {
        setAllUserCoords(result.data.allUsersInterests);
      });
    };

    const getEachUserCoords = () => {
      setAllUsersLocation([]);
      allUserCoords?.forEach((userCoords) => {
        let userCoordsObj = {
          username: userCoords.userInfo.username,
          lat: userCoords.userInfo.coordinate.latitude,
          lng: userCoords.userInfo.coordinate.longitude,
        };
        setAllUsersLocation((current) => [...current, userCoordsObj]);
      });
    };

    const sendToBackend = () => {
      axios.post(`${config.API_BASE_URL}/allUsersCoords`, {
        obj: allUsersLocation,
        currentUserLat: lat,
        currentUserLng: lng,
      });
    };

    getUsersCoords();
    getEachUserCoords();
    sendToBackend();
  }, [allUserCoords]);

  const containerStyle = {
    width: "1000px",
    height: "700px",
  };

  function handleMarkerOnClick(userInfo) {
    console.log("userInfo: ", userInfo.userInfo.username);
    console.log("i am heree");
    return <div className="button">{userInfo.userInfo.username}</div>;
  }
  const center = {
    lat: userInfo.userInfo.coordinate.latitude,
    lng: userInfo.userInfo.coordinate.longitude,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {allUsersLocation?.map((pos) => (
        <Marker
          onLoad={onLoadMarker}
          position={pos}
          onClick={() => handleMarkerOnClick(userInfo)}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
