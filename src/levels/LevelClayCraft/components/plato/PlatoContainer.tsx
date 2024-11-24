import React from "react";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { SortablePlatos } from "@LevelClayCraft/index";

export function PlatosContainer(props) {
  const { id, items } = props;

  const { setNodeRef } = useSortable({
    id,
    animateLayoutChanges: () => false,
    transition: null,
  });

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div className="bg-amber-700 border-transparent border-2">
        <div
          className="bg-yellow-900 rounded border-black border-2 m-2.5 flex flex-row"
          ref={setNodeRef}
        >
          {items.map((id) => (
            <SortablePlatos key={id} id={id} size={id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
