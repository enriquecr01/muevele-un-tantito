import React from "react";

import piso1 from "@LevelAltarDeMuertos/assets/piso-1.png";
import piso2 from "@LevelAltarDeMuertos/assets/piso-2.png";
import piso3 from "@LevelAltarDeMuertos/assets/piso-3.png";
import piso4 from "@LevelAltarDeMuertos/assets/piso-4.png";
import piso5 from "@LevelAltarDeMuertos/assets/piso-5.png";
import piso6 from "@LevelAltarDeMuertos/assets/piso-6.png";
import piso7 from "@LevelAltarDeMuertos/assets/piso-7.png";

import "animate.css";

export default function Level(props) {
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
      className={`flex items-center justify-center touch-none`}
      style={style}
    >
      <img
        src={getLevel(id)}
        alt="chocolate"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
