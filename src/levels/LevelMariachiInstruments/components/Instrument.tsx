import React from "react";
import trompeta from "@images/trompeta.png";
import vihuela from "@images/vihuela.png";
import acordeon from "@images/acordeon.png";
import guitarra from "@images/guitarra.png";
import guitarron from "@images/guitarron.png";
import violin from "@images/violin.png";
import "animate.css";

export default function Instrument(props) {
  const { instrument, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getInstrument = (instrument) => {
    switch (instrument) {
      case "trompeta":
        return trompeta;
      case "vihuela":
        return vihuela;
      case "acordeon":
        return acordeon;
      case "guitarra":
        return guitarra;
      case "guitarron":
        return guitarron;
      case "violin":
        return violin;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
      style={style}
    >
      <img
        src={getInstrument(instrument)}
        alt={instrument}
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
