import React from "react";
import CloseIcon from "./closeIcon";

import "./modal.scss";

function Modal({ show, children, handleClose }) {
  const body = document.querySelector("body");
  if (show) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
  if (!show) {
    return null;
  } else {
    return (
      <div className="modalWrapper">
        <div className="modalWrapper__container">
          <CloseIcon
            onClick={handleClose}
            classElement="modalWrapper__container__closeIcon"
          />
          {children}
        </div>
        <div className="modalWrapper__bg" onClick={handleClose}></div>
      </div>
    );
  }
}

export default Modal;
