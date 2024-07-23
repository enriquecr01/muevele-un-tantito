import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import chocolate from "@images/chocolate.png";
import vainilla from "@images/vainilla.png";
import fresa from "@images/fresa.png";

export function Example() {
  const [parent, setParent] = useState(null);

  const vainillaDraggable = (
    <Draggable id="vainillaDraggable">
      <img src={vainilla} />
      Go ahead, drag me.
    </Draggable>
  );

  const fresaDraggable = (
    <Draggable id="fresaDraggable">
      <img src={fresa} />
      Go ahead, drag me.
    </Draggable>
  );

  const draggable = (
    <Draggable id="draggable">
      <img src={chocolate} />
      Go ahead, drag me.
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : "Drop here"}
      </Droppable>
      <Droppable id="droppable1">
        {parent === "droppable1" ? draggable : "Drop here"}
      </Droppable>
      <Droppable id="droppable2">
        {parent === "droppable2" ? draggable : "Drop here"}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
}
