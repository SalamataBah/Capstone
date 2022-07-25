import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="loading-state">
      <ReactLoading type="balls" color="ffffff" height={"20%"} width={"20%"} />
      <p className="loading-text"> Hold on!!!</p>
    </div>
  );
}
