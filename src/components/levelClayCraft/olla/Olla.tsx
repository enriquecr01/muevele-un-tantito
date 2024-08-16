import React from "react";
import olla1 from "@images/olla-1.png";
import olla2 from "@images/olla-2.png";
import olla3 from "@images/olla-3.png";
import olla4 from "@images/olla-4.png";
import olla5 from "@images/olla-5.png";
import olla6 from "@images/olla-6.png";
import "animate.css";

export default function Olla(props) {
  const { size, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getOllaSize = (size) => {
    switch (size) {
      case 1:
        return olla1;
      case 2:
        return olla2;
      case 3:
        return olla3;
      case 4:
        return olla4;
      case 5:
        return olla5;
      case 6:
        return olla6;
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
