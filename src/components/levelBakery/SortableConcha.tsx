import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import chocolate from "@images/chocolate.png";
import vainilla from "@images/vainilla.png";
import fresa from "@images/fresa.png";
import "animate.css";

export function Item(props) {
  const { color, isDragging } = props;

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const getColor = (color) => {
    if (color === "chocolate") {
      return chocolate;
    }

    if (color === "vainilla") {
      return vainilla;
    }

    if (color === "fresa") {
      return fresa;
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center my-2`}
      style={style}
    >
      <img
        src={getColor(color)}
        alt="chocolate"
        className={`pointer-events-none ${
          isDragging ? "animate__animated animate__swing" : ""
        }`}
      />
    </div>
  );
}

export default function SortableConcha(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} color={props.color} />
    </div>
  );
}
