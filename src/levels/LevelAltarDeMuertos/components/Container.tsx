import React from "react";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";

import { SortableLevel } from "@LevelAltarDeMuertos/index";

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useSortable({
    id,
    animateLayoutChanges: () => false,
    transition: null,
  });

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div className="flex items-center my-4">
        <div>
          <div className="flex flex-col" ref={setNodeRef}>
            {items.map((id) => (
              <SortableLevel key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </SortableContext>
  );
}
