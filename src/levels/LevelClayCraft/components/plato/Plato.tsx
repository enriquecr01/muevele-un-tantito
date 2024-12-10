import React from "react";
import "animate.css";
import { plato1, plato2, plato3, plato4 } from "@LevelClayCraft/index";

export function Plato(props) {
  const { size, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getPlatoSize = (size) => {
    switch (size) {
      case 1:
        return plato1;
      case 2:
        return plato2;
      case 3:
        return plato3;
      case 4:
        return plato4;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none select-none`}
      style={style}
    >
      <img
        src={getPlatoSize(size)}
        alt="chocolate"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
