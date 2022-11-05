import React from "react";
import "./loading.scss";

function Loading() {
  return (
    <div className="loadingWrapper">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  );
}

export default Loading;
