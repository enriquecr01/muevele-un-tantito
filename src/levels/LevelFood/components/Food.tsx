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
          ${type === "elote" ? "h-full" : ""}
          ${type === "taco" ? "max-h-24" : ""}
          ${type === "tamal" ? "max-h-48 w-20" : ""}
          `}
      />
    </div>
  );
}
