import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useMapContext } from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/contexts/MapContext.jsx";
import axios from "axios";
import * as config from "../../../config";

// this code is  not cleaned up but it displays the map, and the only thing left to do is to display the markers

export default function Maps(userInfo) {
  const [allUserCoords, setAllUserCoords] = useState({});

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/allUsers/`).then((result) => {
      setAllUserCoords(result.data.allUsersInterests);
    });
  }, [allUserCoords]);

  let allCoordsArray = Object.keys(allUserCoords).map((key) => {
    return { [key]: allUserCoords[key].userInfo.coordinate };
  });

  let userLat = allCoordsArray.map((item, index) => item[index].latitude);
  let userLong = allCoordsArray.map((item, index) => item[index].longitude);
  let latObj = { ...userLat };
  let lngObj = { ...userLong };
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

  let demoLocations = [
    // { lat: userLat, lng: userLong },
    // from array results (harcoded, needs to be done)
    { lat: 37.3859285, lng: -121.9964962 },
    { lat: 37.3859316, lng: -121.9965076 },
    { lat: 37.3859243, lng: -121.9965082 },
    { lat: 37.3859188, lng: -121.9965086 },
    { lat: 37.385921, lng: -121.9964958 },
    { lat: 37.3859294, lng: -121.996501 },
    { lat: 37.3859195, lng: -121.9965006 },
    { lat: 37.3859239, lng: -121.9964998 },
    { lat: 37.3859233, lng: -121.996504 },
    { lat: 37, lng: 120 },
    { lat: 38, lng: -83 },
  ];
  //   console.log("demoLocations: ", demoLocations);

  const onLoadMarker = (marker) => {};
  const [position, setPosition] = useState({
    lat: 37.3859233,
    lng: -121.996504,
  });
  const { lat, lng } = useMapContext();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxEDEgIYJMJK4XnwR1h7-zbdU9d2yZ3WY",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    const updateCoords = () => {
      setPosition({ lat: lat, lng: lng });
    };
    updateCoords();
  }, [lat, lng]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {demoLocations.map((pos) => (
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
