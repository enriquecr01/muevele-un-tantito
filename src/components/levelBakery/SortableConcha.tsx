import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import chocolate from "@images/chocolate.png";
import vainilla from "@images/vainilla.png";
import fresa from "@images/fresa.png";

export function Item(props) {
  const { color, isDragging } = props;

  const style = {
    boxShadow: isDragging
      ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
      : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
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
        className="pointer-events-none"
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
