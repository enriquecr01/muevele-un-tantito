import React from "react";
import olla1 from "@images/olla-1.png";
import olla2 from "@images/olla-2.png";
import olla3 from "@images/olla-3.png";
import "animate.css";

export default function Olla(props) {
  const { size, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getOllaSize = (size) => {
    if (size === 1) {
      return olla1;
    }

    if (size === 2) {
      return olla2;
    }

    if (size === 3) {
      return olla3;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
      style={style}
    >
      <img
        src={getOllaSize(size)}
        alt="olla"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
