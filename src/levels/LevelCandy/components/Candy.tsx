import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "animate.css";

export function Candy(props) {
  const { id, isDragging } = props;
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
      className="w-full flex items-center justify-center my-2 touch-none"
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={props.image}
        alt={props.id}
        className={`w-28 pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}
