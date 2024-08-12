import React from "react";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";

import SortableCantarito from "./SortableCantarito";

export default function CantaritoContainer(props) {
  const { id, items } = props;

  const { setNodeRef } = useSortable({
    id,
    animateLayoutChanges: () => false,
    transition: null,
  });

  return (
    <SortableContext id={id} items={items} strategy={rectSwappingStrategy}>
      <div className="bg-slate-500 rounded-xl border-black border-2 m-2">
        <div
          className="bg-slate-300 rounded-xl border-black border-2 p-2.5 m-2.5 flex flex-row"
          ref={setNodeRef}
        >
          {items.map((id) => (
            <SortableCantarito key={id} id={id} size={id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
