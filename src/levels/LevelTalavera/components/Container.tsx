import React from "react";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";

import { SortableTalavera } from "@LevelTalavera/index";

const containerStyle = {
  padding: 10,
  margin: 10,
  flex: 1,
  display: "grid",
  gridTemplateColumns: `repeat(5, 1fr)`,
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
            <SortableTalavera key={id} id={id} tile={id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
