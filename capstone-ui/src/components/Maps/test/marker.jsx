import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { useMapContext } from "/Users/salamatabah/Desktop/capstone-project/capstone-ui/src/contexts/MapContext.jsx";
import axios from "axios";
import * as config from "../../../config";
import "./marker.css";

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
          major: userCoords.userInfo.major,
          bio: userCoords.userInfo.bio,
          lat: userCoords.userInfo.coordinate.latitude,
          lng: userCoords.userInfo.coordinate.longitude,
          distance: distance(
            lat,
            lng,
            userCoords.userInfo.coordinate.latitude,
            userCoords.userInfo.coordinate.longitude
          ),
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
    console.log("allUsersLocation: ", allUsersLocation);

    getUsersCoords();
    getEachUserCoords();
    sendToBackend();
  }, [allUserCoords]);
  console.log("allUserCoords: ", allUserCoords);

  const containerStyle = {
    width: "1400px",
    height: "900px",
  };

  const center = {
    lat: userInfo.userInfo.coordinate.latitude,
    lng: userInfo.userInfo.coordinate.longitude,
  };

  function distance(lat1, lon1, lat2, lon2) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return Math.floor(c * r);
  }

  return isLoaded ? (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {allUsersLocation?.map((pos) => (
          <Marker onLoad={onLoadMarker} position={pos}>
            <InfoWindow
              position={pos}
              // position={{
              //   lat: userInfo.userInfo.coordinate.latitude,
              //   lng: userInfo.userInfo.coordinate.longitude,
              // }}
            >
              <div>
                <h4 className="card-text">{pos?.username}</h4>
                <h5 className="card-text">{pos?.bio}</h5>
                <h6 className="card-text">{pos?.major}</h6>
                {pos?.distance ? (
                  <h6 className="card-text">I am {pos?.distance}km away</h6>
                ) : (
                  ""
                )}
              </div>
            </InfoWindow>
          </Marker>
        ))}
        <Polyline
          path={allUsersLocation}
          options={{
            geodesic: true,
            strokeColor: "#669DF6",
            strokeOpacity: 3.0,
            strokeWeight: 2,
            editable: true,
          }}
        ></Polyline>
        {/* <Polygon path={allUsersLocation}></Polygon> */}
        {/* <MapDirectionsRenderer /> */}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
