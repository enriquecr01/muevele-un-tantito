import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableConcha from "./SortableConcha";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
  display: "grid",
  gridTemplateColumns: `repeat(2, 1fr)`,
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
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((id) => (
          <SortableConcha key={id} id={id} color={getColor(id)} />
        ))}
      </div>
    </SortableContext>
  );
}
