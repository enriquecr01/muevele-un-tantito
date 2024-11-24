import React from "react";
import "animate.css";
import {
  atole,
  champurrado,
  mezcal,
  pulque,
  tejuino,
  tepache,
  tequila,
} from "@LevelDrinks/index";

export function Drink(props) {
  const { drink, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getDrink = (drink) => {
    switch (drink) {
      case "atole":
        return atole;
      case "champurrado":
        return champurrado;
      case "mezcal":
        return mezcal;
      case "pulque":
        return pulque;
      case "tejuino":
        return tejuino;
      case "tepache":
        return tepache;
      case "tequila":
        return tequila;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2 touch-none`}
      style={style}
    >
      <img
        src={getDrink(drink)}
        alt={drink}
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__shakeY" : ""
        }`}
      />
    </div>
  );
}
