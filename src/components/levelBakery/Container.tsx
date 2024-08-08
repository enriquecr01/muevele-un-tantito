import React from "react";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";

import SortableConcha from "./SortableConcha";

const containerStyle = {
  padding: 10,
  margin: 10,
  flex: 1,
  display: "grid",
  gridTemplateColumns: `repeat(6, 1fr)`,
};

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useSortable({
    id,
    animateLayoutChanges: () => false,
    transition: null,
  });

  function getColor(id: string) {
    const splitedId = id.split("-");
    const color = splitedId[0];
    return color;
  }

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div className="bg-slate-500 rounded-xl border-black border-2 m-2 p-2">
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
