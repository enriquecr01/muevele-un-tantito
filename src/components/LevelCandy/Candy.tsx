import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export interface ICandy {
  id: string;
  image: string;
  currentBox: string;
}

export function Candy(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { title: props.id, data: props },
  });

  return (
    <div
      ref={setNodeRef}
      className="text-2xl rounded-lg bg-white"
      style={{ transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...listeners}
    >
      {props.id}
    </div>
  );
}
