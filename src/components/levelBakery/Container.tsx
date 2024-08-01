import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableConcha from "./SortableConcha";

const containerStyle = {
  padding: 10,
  margin: 10,
  flex: 1,
  display: "grid",
  gridTemplateColumns: `repeat(2, 1fr)`,
  minHeight: "700px",
  minWidth: "430px",
};

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  function getColor(id: string) {
    const splitedId = id.split("-");
    const color = splitedId[0];
    return color;
  }

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        className="bg-slate-500 rounded-xl border-black border-2 m-2 p-2"
        style={{ minHeight: "700px", minWidth: "430px" }}
      >
        <div
          className="bg-slate-300 rounded-xl border-black border-2"
          ref={setNodeRef}
          style={containerStyle}
        >
          {items.map((id) => (
            <SortableConcha key={id} id={id} color={getColor(id)} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
