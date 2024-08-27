import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "animate.css";

export interface ICandy {
  id: number;
  image: string;
  currentBox: string;
}

export function Candy(props) {
  const { id, isDragging } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { title: props.id, data: props },
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full flex items-center justify-center my-2 touch-none"
      style={{ transform: CSS.Translate.toString(transform) }}
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
