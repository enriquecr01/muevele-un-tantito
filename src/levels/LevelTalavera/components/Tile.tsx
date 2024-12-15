import React from "react";
import "animate.css";
import { huevo, cayendo, mediano, nacido, volando } from "@LevelTalavera/index";

export function Tile(props) {
  const { tile, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getTile = (tile) => {
    switch (tile) {
      case "huevo":
        return huevo;
      case "cayendo":
        return cayendo;
      case "mediano":
        return mediano;
      case "nacido":
        return nacido;
      case "volando":
        return volando;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none select-none`}
      style={style}
    >
      <img
        src={getTile(tile)}
        alt={tile}
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__pulse" : ""
        }`}
      />
    </div>
  );
}
