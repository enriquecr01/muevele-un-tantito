import React, { useState } from "react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import putItem from "@sounds/putitem.mp3";
import "animate.css";
import { CantaritoContainer, Cantarito } from "@LevelClayCraft/index";
import { useMueveleTantitoSensors } from "@utils/index";

type CantaritoRackProps = {
  cantaritos: number[];
  setByType(type: string, active: any, over: any): void;
};

export function CantaritoRack({ cantaritos, setByType }: CantaritoRackProps) {
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

    if (activeId === overId || overId === "cantaritos") {
      return;
    }

    setByType("cantaritos", active, over);
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
          <CantaritoContainer id="cantaritos" items={cantaritos} />
          <DragOverlay transition={null}>
            {activeId ? (
              <Cantarito id={activeId} size={activeId} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
