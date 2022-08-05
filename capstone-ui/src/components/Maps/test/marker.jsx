import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// this code is  not cleaned up but it displays the map, and the only thing left to do is to display the markers
const containerStyle = {
  width: "400px",
  height: "400px",
};
console.log("containerStyle: ", containerStyle);

const center = {
  lat: -3.745,
  lng: -38.523,
};
const position = {
  lat: 37.772,
  lng: -122.214,
};

const onLoadMarker = (marker) => {
  console.log("marker: ", marker);
};

export default function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDxEDEgIYJMJK4XnwR1h7-zbdU9d2yZ3WY",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    console.log("onLoad: ", onLoad);
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker onLoad={onLoadMarker} position={position} />
    </GoogleMap>
  ) : (
    <></>
  );
}
