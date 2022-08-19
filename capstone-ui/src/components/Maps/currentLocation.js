import { useState } from "react";
import { func } from "prop-types";
import { useMapContext } from "../../contexts/MapContext";

// it gets the user's location from the browser.
const CurrentLocation = (props) => {
  const {
    onFetchAddress = () => {},
    onError = () => {},
    children = () => null,
  } = props;
  const { getLocation } = useMapContext();

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
