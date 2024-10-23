import React from "react";
import rojo from "@LevelAlebrijes/assets/rojo.png";
import naranja from "@LevelAlebrijes/assets/naranja.png";
import verde from "@LevelAlebrijes/assets/verde.png";
import amarillo from "@LevelAlebrijes/assets/amarillo.png";
import azul from "@LevelAlebrijes/assets/azul.png";
import indigo from "@LevelAlebrijes/assets/indigo.png";
import violeta from "@LevelAlebrijes/assets/violeta.png";
import "animate.css";

export default function Alebrije(props) {
  const { alebrije, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getAlebrije = (alebrije) => {
    switch (alebrije) {
      case "rojo":
        return rojo;
      case "naranja":
        return naranja;
      case "verde":
        return verde;
      case "amarillo":
        return amarillo;
      case "azul":
        return azul;
      case "indigo":
        return indigo;
      case "violeta":
        return violeta;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
      style={style}
    >
      <img
        src={getAlebrije(alebrije)}
        alt={alebrije}
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
