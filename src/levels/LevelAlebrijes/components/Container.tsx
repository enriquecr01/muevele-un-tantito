import React from "react";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";

import { SortableAlebrije } from "@LevelAlebrijes/index";

const containerStyle = {
  padding: 10,
  margin: 10,
  flex: 1,
  display: "grid",
  gridTemplateColumns: `repeat(7, 1fr)`,
};

export function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useSortable({
    id,
    animateLayoutChanges: () => false,
    transition: null,
  });

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div>
        <div ref={setNodeRef} style={containerStyle}>
          {items.map((id) => (
            <SortableAlebrije key={id} id={id} alebrije={id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
