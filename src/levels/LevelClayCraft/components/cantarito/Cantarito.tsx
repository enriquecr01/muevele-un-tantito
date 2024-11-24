import React from "react";
import "animate.css";
import {
  cantarito1,
  cantarito2,
  cantarito3,
  cantarito4,
} from "@LevelClayCraft/index";

export function Cantarito(props) {
  const { size, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getCantaritoSize = (size) => {
    switch (size) {
      case 1:
        return cantarito1;
      case 2:
        return cantarito2;
      case 3:
        return cantarito3;
      case 4:
        return cantarito4;
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
