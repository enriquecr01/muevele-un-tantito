import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "animate.css";

export interface IFood {
  id: number;
  image: string;
  currentBox: string;
  type: string;
}

export function Food(props) {
  const { id, isDragging, type } = props;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: { title: props.id, data: props },
  });
  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getStyleFood = (type) => {
    switch (type) {
      case "elote":
        return "h-full";
      case "taco":
        return "max-h-8 w-8 xs:max-h-12 xs:w-12 sm:max-h-16 sm:w-16 lg:max-h-20 lg:w-20";
      case "tamal":
        return "max-h-16 w-9 xs:max-h-32 xs:w-16 sm:max-h-36 sm:w-20 md:max-h-36 md:w-20";
      case "quesadilla":
        return "max-h-16 w-16 xs:max-h-[4.5rem] xs:w-[4.5rem] sm:max-h-[4.6rem] sm:w-[4.6rem] md:max-h-[4.6rem] md:w-[4.6rem] lg:max-h-[5.5rem] lg:w-[5.5rem]";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-full flex items-center justify-center touch-none 
        ${type === "elote" ? "h-full" : ""}
        ${type === "tamal" ? "w-20" : ""}
        `}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={props.image}
        alt={props.id}
        className={`w-28 pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }
          ${getStyleFood(type)}
          `}
      />
    </div>
  );
}
