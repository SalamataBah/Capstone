import React, { useState, useContext, Component } from "react";

const MapContext = React.createContext();

export function useMapContext() {
  return useContext(MapContext);
}

export function MapContextProvider({ children }) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [status, setStatus] = useState("");
  const [test, setTest] = useState("This place is boring!!!");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const value = {
    lat,
    lng,
    test,
    setLat,
    setLng,
    getLocation,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
