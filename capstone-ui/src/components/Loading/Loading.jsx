import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading-state">
      <ReactLoading
        type="spin"
        color="white"
        height={"20%"}
        width={"20%"}
        delay="100"
      />
      <p className="loading-text"> Hold on!!!</p>
    </div>
  );
}
