import React from "react";
import video from "../../assets/videoBG.mp4";

function VideoBackground() {
  return (
    <video
      className="videoTag"
      autoPlay
      src={video}
      loop
      muted
      playsInline
    ></video>
  );
}

export default VideoBackground;
