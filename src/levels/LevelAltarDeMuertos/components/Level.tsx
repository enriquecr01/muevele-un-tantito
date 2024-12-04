import React from "react";
import "animate.css";
import {
  piso1,
  piso2,
  piso3,
  piso4,
  piso5,
  piso6,
  piso7,
} from "@LevelAltarDeMuertos/index";

export function Level(props) {
  const { id, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getLevel = (level) => {
    switch (level) {
      case 1:
        return piso1;
      case 2:
        return piso2;
      case 3:
        return piso3;
      case 4:
        return piso4;
      case 5:
        return piso5;
      case 6:
        return piso6;
      case 7:
        return piso7;
    }
  };

  return (
    <div
      className={`flex items-center justify-center touch-none select-none`}
      style={style}
    >
      <img
        src={getLevel(id)}
        alt="chocolate"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__shakeX" : ""
        }`}
      />
    </div>
  );
}
