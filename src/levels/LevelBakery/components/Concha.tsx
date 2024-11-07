import React from "react";
import "animate.css";
import { chocolate, vainilla, fresa } from "@LevelBakery/index";

export function Concha(props) {
  const { color, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getColor = (color) => {
    if (color === "chocolate") {
      return chocolate;
    }

    if (color === "vainilla") {
      return vainilla;
    }

    if (color === "fresa") {
      return fresa;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
      style={style}
    >
      <img
        src={getColor(color)}
        alt="chocolate"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
