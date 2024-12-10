import React, { useState } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { OllaContainer, Olla } from "@LevelClayCraft/index";
import { useMueveleTantitoSensors } from "@utils/index";

type OllasRackProps = {
  ollas: number[];
  setByType(type: string, active: any, over: any): void;
};
export function OllaRack({ ollas, setByType }: OllasRackProps) {
  const { sensors } = useMueveleTantitoSensors();
  const [activeId, setActiveId] = useState();

  const putItemSound = new Audio(putItem);

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  async function handleDragEnd(event) {
    const { active, over } = event;
    const { id: overId } = over;

    if (activeId === overId || overId === "ollas") {
      return;
    }

    setByType("ollas", active, over);
    setActiveId(null);
    putItemSound.play();
  }

  return (
    <>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <OllaContainer id="ollas" items={ollas} />
          <DragOverlay transition={null}>
            {activeId ? (
              <Olla id={activeId} size={activeId} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
