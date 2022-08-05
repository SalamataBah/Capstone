import { useState } from "react";
import { func } from "prop-types";

// it gets the user's location from the browser.

const geocodeLatLng = (lat, lng, onFetchAddress, handleError) => {
  const googleMaps = window.google && window.google.maps;
  if (googleMaps) {
    const geocoder = new googleMaps.Geocoder();
    geocoder.geocode(
      {
        location: {
          lat,
          lng,
        },
      },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            onFetchAddress(results);
            handleError("");
          } else {
            handleError("noResultsFound", "ZERO_RESULTS");
            onFetchAddress([]);
          }
        } else {
          const errorType =
            status === "ZERO_RESULTS" ? "noResultsFound" : "geocodeError";
          handleError(errorType, status);
        }
      }
    );
  } else {
    handleError("mapsUnavailable");
  }
};

const getResults = (position, onFetchAddress, handleError) => {
  const { coords = {} } = position;
  const { latitude: lat, longitude: lng } = coords;
  if (lat && lng) {
    geocodeLatLng(lat, lng, onFetchAddress, handleError);
  } else {
    handleError("coordsUnavailable");
  }
};

const getGeoLocationError = (error, handleError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return handleError("permissionDenied");
    case error.POSITION_UNAVAILABLE:
      return handleError("positionUnavailable");
    case error.TIMEOUT:
      return handleError("timeout");
    default:
      handleError("unknown");
  }
};

const getLocation = (onFetchAddress, handleError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => getResults(position, onFetchAddress, handleError),
      (error) => getGeoLocationError(error, handleError)
    );
  } else {
    handleError("geoLocationUnavailable");
  }
};

const CurrentLocation = (props) => {
  const {
    onFetchAddress = () => {},
    onError = () => {},
    children = () => null,
  } = props;

  const [loading, setLoading] = useState(false);

  const handleError = (type, status = "") => {
    setLoading(false);
    type && onError(type, status);
  };

  return children({
    getCurrentLocation: () => {
      setLoading(true);
      getLocation(onFetchAddress, handleError);
    },
    loading,
  });
};

CurrentLocation.propTypes = {
  onFetchAddress: func,
  onError: func,
  children: func,
};

export default CurrentLocation;
