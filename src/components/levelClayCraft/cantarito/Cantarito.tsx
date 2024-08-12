import React from "react";
import cantarito1 from "@images/cantarito-1.png";
import cantarito2 from "@images/cantarito-2.png";
import cantarito3 from "@images/cantarito-3.png";
import "animate.css";

export default function Cantarito(props) {
  const { size, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getCantaritoSize = (size) => {
    if (size === 1) {
      return cantarito1;
    }

    if (size === 2) {
      return cantarito2;
    }

    if (size === 3) {
      return cantarito3;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
      style={style}
    >
      <img
        src={getCantaritoSize(size)}
        alt="chocolate"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
