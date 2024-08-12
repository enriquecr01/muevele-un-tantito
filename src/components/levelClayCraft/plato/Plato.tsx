import React from "react";
import plato1 from "@images/plato-1.png";
import plato2 from "@images/plato-2.png";
import plato3 from "@images/plato-3.png";
import "animate.css";

export default function Plato(props) {
  const { size, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getPlatoSize = (size) => {
    if (size === 1) {
      return plato1;
    }

    if (size === 2) {
      return plato2;
    }

    if (size === 3) {
      return plato3;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
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
