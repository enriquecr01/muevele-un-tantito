import React from "react";
import atole from "@LevelDrinks/assets/atole.png";
import champurrado from "@LevelDrinks/assets/champurrado.png";
import mezcal from "@LevelDrinks/assets/mezcal.png";
import pulque from "@LevelDrinks/assets/pulque.png";
import tejuino from "@LevelDrinks/assets/tejuino.png";
import tepache from "@LevelDrinks/assets/tepache.png";
import tequila from "@LevelDrinks/assets/tequila.png";
import "animate.css";

export default function Drink(props) {
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
